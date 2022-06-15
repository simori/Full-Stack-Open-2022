const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('../', (request, response) => {
  response.send('<b>MOIKKULI</b>')
})

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogsRouter.post('/', (request, response, next) => {
  const body = request.body
  // jos uusi blogi ei sisällä kenttiä title ja url,
  // pyyntöön vastataan statuskoodilla 400 Bad Request.
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes
  })
  if (blog.title === undefined || blog.url === undefined) {
    response.status(400).end()
  } else {
    blog.save()
      .then(savedBlog => {
        response.status(201).json(savedBlog)
      })
      .catch(error => next(error))
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
  /* wanha ilman async awaittia
  .then(() => {
    response.status(204).end()
  })
  .catch(error => next(error)) */
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter
