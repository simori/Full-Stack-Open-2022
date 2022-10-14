// tehtävä 7-11 siirrä blogien tietojen talletus Reduxiin
import { createSlice } from '@reduxjs/toolkit'

import blogs from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlog(state, action) {
      // blogin päivitys (liketys)
      const blog = action.payload
      return state.map((b) => (b.id === blog.id ? blog : b))
    },
    initBlogs(state, action) {
      // bloglistan alustaminen
      return action.payload
    },
    appendBlog(state, action) {
      // uuden blogin lisäys
      state.push(action.payload)
    },
    removeBlog(state, action) {
      // blogin poisto
      const blog = action.payload
      return state.filter((b) => b.id !== blog.id)
    }
  }
})

export const { setBlog, initBlogs, appendBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const bloglist = await blogs.getAll()
    dispatch(initBlogs(bloglist))
  }
}

export const addBlog = (newBlog) => {
  return async (dispatch) => {
    const blog = await blogs.create(newBlog)
    dispatch(appendBlog(blog))
  }
}

// 7.12 tykkääminen
export const likeBlog = (blog) => {
  return async (dispatch) => {
    const liked = await blogs.update(blog.id, blog)
    dispatch(setBlog(liked))
  }
}

// 7.12 poistaminen
export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogs.remove(blog.id)
    dispatch(removeBlog(blog))
  }
}

// 7.18&19 kommentointi
export const commentBlog = (blog, comment) => {
  return async (dispatch) => {
    const commented = await blogs.comment(blog.id, { content: comment })
    dispatch(setBlog(commented))
  }
}
export default blogSlice.reducer
