import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ setBlogs, blogList, blog, currentUser }) => {
  const [viewAllInfo, setViewAllInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeBlog = async (blog) => {
    try {
      const newBlogObj = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user,
        id: blog.id
      }
      const updatedBlog = blogList.map(b => {
        if (b.id === newBlogObj.id) {
          return { ...b, likes: blog.likes + 1 }
        }
        return b
      })

      setBlogs(updatedBlog.sort(
        (a, b) => { return b.likes - a.likes }
      ))
      delete newBlogObj.id
      await blogService.update(blog.id, newBlogObj)

    } catch(exception) {
      console.log('EpäOnnistui blogin liketys! ', exception.message)
    }
    console.log(blog.title, 'liked!')
  }

  const removeBlog = async (blog) => {
    try {
      if (window.confirm(`Do you really want to delete ${blog.title}?`)) {
        const filtered = blogList.filter(b => b.id !== blog.id)
        // console.log('filtered on', filtered)
        setBlogs(filtered)
        await blogService.remove(blog.id)
      }
    } catch(exception) {
      console.log('EpäOnnistui blogin poisto! ', exception.message)
    }

    console.log(blog.title, 'removed')
  }

  //wconsole.log('blog user', blog.user, 'blog user name', blog.user.name, 'currentUser', currentUser, blog)
  if (viewAllInfo === true && blog.user.name === currentUser) {
    return (
      <div style={blogStyle}>
        <div className='blog'>
          {blog.title} {blog.author} <button onClick={() => setViewAllInfo(false)}>hide</button><br/>
          {blog.url}<br/>
          {blog.likes} likes <button id="likeButton" onClick={() => likeBlog(blog)}>like this blog</button><br/>
          <button id="removeBlog" onClick={() => removeBlog(blog)}>remove this blog</button>
        </div>
      </div>
    )
  } else if (viewAllInfo === true) {
    return (
      <div style={blogStyle}>
        <div className='blog'>
          {blog.title} {blog.author} <button onClick={() => setViewAllInfo(false)}>hide</button><br/>
          <div className='.url'>{blog.url}</div><br/>
          <div className='.likes'>{blog.likes}</div> likes <button id="likeButton" onClick={() => likeBlog(blog)}>like this blog</button><br/>
        </div>
      </div>
    )
  }
  return (
    <div style={blogStyle}>
      <div className='blog'>
        {blog.title} {blog.author} <button id="viewBlog" onClick={() => setViewAllInfo(true)}>view</button>
      </div>
    </div>
  )
}

// 5.11
Blog.propTypes = {
  setBlogs: PropTypes.func.isRequired,
  blogList: PropTypes.array.isRequired,
  blog: PropTypes.object.isRequired,
  currentUser: PropTypes.string.isRequired
}

export default Blog