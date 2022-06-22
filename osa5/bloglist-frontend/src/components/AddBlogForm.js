import React from 'react'
import PropTypes from 'prop-types'

// 5.6
const AddBlogForm = ({
  handleSubmit,
  setTitle,
  setAuthor,
  setUrl,
  title,
  author,
  url
}) => {
  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type='text'
            value={title}
            name='Title'
            onChange={setTitle}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            name='Author'
            onChange={setAuthor}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            name='Url'
            onChange={setUrl}
          />
        </div>
        <button type='submit'>create new blog!</button>
      </form>
    </div>
  )
}

// 5.11
AddBlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  setAuthor: PropTypes.func.isRequired,
  setUrl: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default AddBlogForm