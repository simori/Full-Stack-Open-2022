import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import AddBlogForm from './components/AddBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errState, setErrState] = useState(false)
  // const [newBlogTitle, setNewBlogTitle] = useState('')
  // const [newBlogAuthor, setNewBlogAuthor] = useState('')
  // const [newBlogUrl, setNewBlogUrl] = useState('')
  const [addBlogVisible, setAddBlogVisible] = useState(false)

  //const newBlogRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort(
        (a, b) => { return b.likes - a.likes}
      ) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginHandler = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      // 5.2
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrState(true)
      setMessage('Login failed because wrong credentials entered!')
      setTimeout(() => {
        setMessage(null)
        setErrState(false)
      }, 3000)
    }
  }

  // 5.2
  const logoutHandler = (event) => {
    event.preventDefault()

    window.localStorage.clear()
    console.log(user.name, 'Logged out!')
    setUser(null)
    setMessage(user.name + ' Logged Successfully out!')
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  // 5.3
  const addBlogHandler = (blogObject) => {
    //event.preventDefault() ^^ (event)
    /*  setNewBlogTitle('testititteli')
    setNewBlogAuthor('testiautoori')
    setNewBlogUrl('testiurlii') */

    try {
      /* const newBlogObj = {
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl
        //id: notes.length + 1,
      }
      console.log(newBlogTitle, newBlogAuthor, newBlogUrl, newBlogObj)
      */
      //console.log('blogObject on ', blogObject)
      blogService
        .create(blogObject)
        .then(returnedBlog => {
          console.log('returned Blogi on', returnedBlog)
          setBlogs(blogs.concat(returnedBlog))
        })
      setAddBlogVisible(false)
      console.log(`Successfully added new blog ${blogObject.title} by ${blogObject.author}!`)
      setMessage(`Successfulley added new blog ${blogObject.title} by ${blogObject.author}!`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
      // setNewBlogAuthor('')
      // setNewBlogTitle('')
      // setNewBlogUrl('')

    } catch (exception) {
      console.log('EpäOnnistui blogin lisäys! ', exception.message)
      setErrState(true)
      setMessage('Blog adding failed!', true)
      setTimeout(() => {
        setMessage(null)
        setErrState(false)
      }, 3000)
    }
  }
  // 5.5
  const newBlogForm = () => {
    const hideWhenVisible = { display: addBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: addBlogVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button id="crate-button" onClick={() => setAddBlogVisible(true)}>create</button>
        </div>
        <div style={showWhenVisible}>
          <AddBlogForm
            createBlog={addBlogHandler}
          />
          <button onClick={() => setAddBlogVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }


  // 5.1
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} error={errState}/>
        <form onSubmit={loginHandler}>
          <div>
          username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
          password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">login</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} error={errState} />
      Logged in as {user.name}! <button id="logout" onClick={logoutHandler}>logout!</button>
      <br/>
      {newBlogForm()}
      <br/>
      {/* <h2>create new blog</h2>
      <form onSubmit={addBlogHandler}> userilla on token, username ja name
        <div>
          title:
            <input
            type="text"
            value={newBlogTitle}
            name="Title"
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        <div>
          author:
            <input
            type="text"
            value={newBlogAuthor}
            name="Author"
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div>
          url:
            <input
            type="text"
            value={newBlogUrl}
            name="Url"
            onChange={({ target }) => setNewBlogUrl(target.value)}
          />
        </div>
        <button type="submit">create new blog!</button>
        </form> */}
      {blogs.map(
        blog => <Blog key={blog.id} setBlogs={setBlogs} blogList={blogs} blog={blog} currentUser={user.name} />
      )
      }
    </div>
  )
}

export default App
