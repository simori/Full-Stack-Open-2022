import React, { useState, useEffect } from 'react'
import { SingleBlog } from './components/Blog'
import Users, { SingleUser } from './components/Users'
import Notification from './components/Notification'
import AddBlogForm from './components/AddBlogForm'
import Home from './components/Home'
import userService from './services/users'
import Menu from './components/Menu'

import { Routes, Route } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { createNotification } from './reducers/notificationReducer'
import { initializeBlogs, addBlog } from './reducers/blogReducer'
import { checkLogin, loginUser, logoutUser } from './reducers/userReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [addBlogVisible, setAddBlogVisible] = useState(false)

  const dispatch = useDispatch()

  const blogs2 = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const [userlist, setUsers] = useState([])
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await userService.getAll()
        setUsers(res)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  const sortedBlogs = [...blogs2].sort((a, b) => {
    return b.likes - a.likes
  })

  // kaikkien blogien näyttäminen
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  // kirjautumisen tarkistus
  useEffect(() => {
    dispatch(checkLogin())
  }, [dispatch])

  // kirjautumisen käsittelijä
  const loginHandler = async (event) => {
    event.preventDefault()
    try {
      const user = await dispatch(
        loginUser({
          username,
          password
        })
      )
      console.log(user)

      setUsername('')
      setPassword('')
      dispatch(createNotification(`${username} Logged Successfully in!`, false))
    } catch (exception) {
      console.log('wrong credentials exexeption ennen dispatchia')
      console.log(exception)
      dispatch(
        createNotification(
          'Login failed because wrong credentials entered!',
          true
        )
      )
    }
  }

  // 5.2
  const logoutHandler = (event) => {
    event.preventDefault()

    window.localStorage.clear()
    dispatch(logoutUser())

    dispatch(createNotification(`${user.name} Logged Successfully out!`, false))
  }

  // 5.3
  const addBlogHandler = (blogObject) => {
    try {
      dispatch(addBlog(blogObject))
      setAddBlogVisible(false)
      dispatch(
        createNotification(
          `Successfulley added new blog ${blogObject.title} by ${blogObject.author}!`,
          false
        )
      )
    } catch (exception) {
      dispatch(createNotification('Blog adding failed!', true))
    }
  }
  // 5.5
  const newBlogForm = () => {
    const hideWhenVisible = { display: addBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: addBlogVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible} className="justify-content-end">
          <button
            className="btn btn-primary"
            id="crate-button"
            onClick={() => setAddBlogVisible(true)}
          >
            create new blog
          </button>
        </div>
        <div style={showWhenVisible}  className="nav justify-content-end">
          <AddBlogForm createBlog={addBlogHandler} />
          <button className="btn btn-danger" onClick={() => setAddBlogVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  // 5.1
  if (!user) {
    return (
      <div className="container">
        <h2>Log in to application</h2>
        <Notification />
        <form onSubmit={loginHandler}>
          <div className="form-floating mb-3">
            <input
              id="username"
              className="form-control"
              type="text"
              value={username}
              name="Username"
              placeholder="name@example.com"
              onChange={({ target }) => setUsername(target.value)}
            />
            <label htmlFor="username">username</label>
          </div>
          <div className="form-floating mb-3">
            <input
              id="password"
              className="form-control"
              type="password"
              value={password}
              name="Password"
              placeholder="name@example.com"
              onChange={({ target }) => setPassword(target.value)}
            />
            <label htmlFor="password">password</label>
          </div>
          <button id="login-button" className="btn btn-primary" type="submit">
            login
          </button>
        </form>
      </div>
    )
  }
  return (
    <div className="container">
      <Menu user={user.name} logout={logoutHandler} />
      {/* <Header /> */}

      <Routes>
        <Route
          path="/"
          element={
            <Home user={user} newBlogForm={newBlogForm()} blogs={sortedBlogs} />
          }
        />
        <Route path="/users" element={<Users />} />
        <Route
          path="/users/:id"
          element={<SingleUser userlist={userlist} blogs={sortedBlogs} />}
        />
        <Route
          path="/blogs/:id"
          element={<SingleBlog bloglist={sortedBlogs} />}
        />
      </Routes>
    </div>
  )
}

export default App
