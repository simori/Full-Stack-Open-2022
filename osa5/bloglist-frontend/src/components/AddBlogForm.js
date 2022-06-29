import { useState } from 'react'
import PropTypes from 'prop-types'

// 5.6
const AddBlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: 0
    })

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="blogTitle"
            type='text'
            value={newBlogTitle}
            name='Title'
            onChange={handleTitleChange}
            placeholder='BlogTitle!'
          />
        </div>
        <div>
          author:
          <input
            id="blogAuthor"
            type='text'
            value={newBlogAuthor}
            name='Author'
            onChange={handleAuthorChange}
            placeholder='BlogAuthor!'
          />
        </div>
        <div>
          url:
          <input
            id="blogUrl"
            type='text'
            value={newBlogUrl}
            name='Url'
            onChange={handleUrlChange}
            placeholder='BlogUrl!'
          />
        </div>
        <button id="createBlog" type='submit'>create new blog!</button>
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