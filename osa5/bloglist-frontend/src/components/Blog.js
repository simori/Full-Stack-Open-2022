import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, currentUser }) => {
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
        user: blog.user
        //id: notes.length + 1,
      }
      await blogService.update(blog.id, newBlogObj)

    } catch(exception) {
      console.log('EpäOnnistui blogin liketys! ', exception.message)
    }
    console.log(blog.title, 'liked!');
  }

  const removeBlog = async (blog) => {
    try {
      if (window.confirm(`Do you really want to delete ${blog.title}?`)) {
        await blogService.remove(blog.id)
      }    
    } catch(exception) {
      console.log('EpäOnnistui blogin poisto! ', exception.message)
    }
    console.log(blog.title, 'removed');
  }

  if (viewAllInfo === true && blog.user.name === currentUser) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author} <button onClick={() => setViewAllInfo(false)}>hide</button><br/>
          {blog.url}<br/>
          {blog.likes} likes <button onClick={() => likeBlog(blog)}>like this blog</button><br/>
          {blog.user.name}<br/>
          <button onClick={() => removeBlog(blog)}>remove this blog</button>
        </div>
      </div>
    )
  } else if (viewAllInfo === true) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author} <button onClick={() => setViewAllInfo(false)}>hide</button><br/>
          {blog.url}<br/>
          {blog.likes} likes <button onClick={() => likeBlog(blog)}>like this blog</button><br/>
          {blog.user.name}<br/>
        </div>
      </div>
    )
  }
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={() => setViewAllInfo(true)}>view</button>
      </div>
    </div>
  )
}

export default Blog