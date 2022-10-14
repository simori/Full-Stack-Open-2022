import { useState } from 'react'
import { Table } from 'react-bootstrap'
//import blogService from '../services/blogs'
import PropTypes from 'prop-types'

import { Link, useParams } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogReducer' // 7.12

const like = (blog, dispatch) => {
  try {
    const newBlogObj = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    dispatch(likeBlog(newBlogObj))
    dispatch(
      createNotification(`You liked ${blog.title} by ${blog.author}!`, false)
    )
  } catch (exception) {

    dispatch(createNotification('Blog liking failed!', true))
    console.log(exception)
  }
}

const removeBlog = (blog, dispatch) => {
  try {
    if (window.confirm(`Do you really want to delete ${blog.title}?`)) {

      dispatch(deleteBlog(blog))
      dispatch(
        createNotification(`Deleted ${blog.title} by ${blog.author}!`, false)
      )
    }
  } catch (exception) {
    dispatch(createNotification('Blog deleting failed!', true))
  }

}

// 7.16
export const SingleBlog = ({ bloglist }) => {
  const [newComment, setNewComment] = useState('')
  const dispatch = useDispatch()
  const id = useParams().id

  const findBlog = bloglist.find((b) => b.id === id)

  const commentHandler = (event) => {
    setNewComment(event.target.value)
  }

  const addCommentHandler = (event) => {
    event.preventDefault()

    dispatch(commentBlog(findBlog, newComment))
    dispatch(
      createNotification(`Successfully commented ${findBlog.title}!`, false)
    )
    setNewComment('')
  }

  if (!findBlog) {
    return null
  }

  return (
    <div>
      <div className="row">
        <div className="col">
          <h2>
            {findBlog.title} by {findBlog.author}
          </h2>
          <a href={findBlog.url} target="_blank" rel="noreferrer">
            {findBlog.url}
          </a>
          <br />
          {findBlog.likes} likes
          <button id="likeButton" onClick={() => like(findBlog, dispatch)}>
            like this blog!
          </button>
          <br />
          added by {findBlog.user.name}
          <br />
        </div>
        <div className="col">
          <h2>Comments</h2>
          <form onSubmit={addCommentHandler}>
            <input
              id="comment"
              type="text"
              value={newComment}
              name="Title"
              onChange={commentHandler}
              placeholder=""
            ></input>
            <button type="submit">send comment</button>
          </form>
          <ul>
            <Table>
              <tbody>
                {findBlog.comments.map((c) => (
                  <tr key={c.id}>
                    <td>{c.content}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ul>
        </div>
      </div>
    </div>
  )
}

const Blog = ({ blog, currentUser }) => {
  const [viewAllInfo, setViewAllInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (viewAllInfo === true) {
    if (blog.user.name === currentUser.name) {
      return (
        <div style={blogStyle}>
          <div className="blog">
            {blog.title} {blog.author}{' '}
            <button onClick={() => setViewAllInfo(false)}>hide</button>
            <br />
            {blog.url}
            <br />
            {blog.likes} likes{' '}
            <button id="likeButton" onClick={() => like(blog)}>
              like this blog
            </button>
            <br />
            <button id="removeBlog" onClick={() => removeBlog(blog)}>
              remove this blog
            </button>
          </div>
        </div>
      )
    } else {
      return (
        <div style={blogStyle}>
          <div className="blog">
            {blog.title} {blog.author}{' '}
            <button onClick={() => setViewAllInfo(false)}>hide</button>
            <br />
            <div className=".url">{blog.url}</div>
            <div className=".likes">{blog.likes}</div> likes{' '}
            <button id="likeButton" onClick={() => like(blog)}>
              like this blog
            </button>
            <br />
          </div>
        </div>
      )
    }
  }
  return (
    <div style={blogStyle}>
      <div className="blog">
        {/*  */}
        <Link to={`/blogs/${blog.id}`}>
          <em>{blog.title} </em>
        </Link>
        by {blog.author}
      </div>
    </div>
  )
}

// 5.11
Blog.propTypes = {
  //setBlogs: PropTypes.func.isRequired,
  //blogList: PropTypes.array.isRequired,
  blog: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired
}

export default Blog
