import { useState } from 'react'
import { useDispatch } from 'react-redux' // 7.11
import PropTypes from 'prop-types'
import { addBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'

// 5.6
const AddBlogForm = () => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const dispatch = useDispatch()

  const handleTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }

  const addBlogHandler = (event) => {
    event.preventDefault()
    dispatch(
      addBlog({
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl,
        likes: 0
      })
    )

    dispatch(
      createNotification(
        `Successfulley added new blog ${newBlogTitle} by ${newBlogAuthor}!`,
        false
      )
    )
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <div className="nav justify-content-end">
      <h2>create new blog</h2>
      <form onSubmit={addBlogHandler} className="nav justify-content-end">
        <div className="nav justify-content-end">
          <input
            id="blogTitle"
            type="text"
            value={newBlogTitle}
            name="Title"
            onChange={handleTitleChange}
            placeholder="Blog title"
          /><br/>
        </div>
        <div className="nav justify-content-end">
          <input
            id="blogAuthor"
            type="text"
            value={newBlogAuthor}
            name="Author"
            onChange={handleAuthorChange}
            placeholder="Blog author"
          /><br/>
        </div><br/>
        <div className="nav justify-content-end">
          <input
            id="blogUrl"
            type="text"
            value={newBlogUrl}
            name="Url"
            onChange={handleUrlChange}
            placeholder="Blog url"
          /><br/>
        </div><br/>
        <button id="createBlog" className="btn btn-primary" type="submit">
          create new blog!
        </button>
      </form>
    </div>
  )
}

AddBlogForm.displayName = 'AddBlogForm'

// 5.11
AddBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default AddBlogForm
