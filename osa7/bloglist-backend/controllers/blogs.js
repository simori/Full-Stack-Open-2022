const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('../', (request, response) => {
  response.send('bloglist backend')
})

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  // const user = request.user
  // console.log('käyttäjä on request.user -', request.user)
  const decodedToken = await jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid!' })
  }
  const seekedUser = await User.findById(decodedToken.id)
  console.log('seekedUser on', seekedUser)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    comments: [],
    user: seekedUser
  })
  // jos uusi blogi ei sisällä kenttiä title ja url,
  // pyyntöön vastataan statuskoodilla 400 Bad Request.
  if (blog.title === undefined || blog.url === undefined) {
    return response
      .status(400)
      .json({ error: 'title or url missing! bad request, cannot add blog!' })
  } else {
    const savedBlog = await blog.save()
    seekedUser.blogs = seekedUser.blogs.concat(savedBlog._id)
    await seekedUser.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const accessToken = await jwt.verify(request.token, process.env.SECRET)
  console.log('accestoken:', accessToken)
  const user = request.user
  console.log('request user---', user)
  if (!request.token) {
    return response.status(401).json({ error: 'token missing!' })
  } else if (!accessToken.id) {
    return response.status(401).json({ error: 'invalid token!' })
  }

  console.log('await findbyid...', request.params.id)
  const blog = await Blog.findById(request.params.id)
  // console.log('blog.user', blog.user, 'accesstoken.id', accessToken.id)
  if (blog.user.toString() === accessToken.id.toString()) {
    console.log('kaikki okei, deletään blogi!', request.params.id)
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else
    return response
      .status(401)
      .json({ error: 'delete failed because invalid token!' })
  /* wanha ilman async awaittia
  .then(() => {
    response.status(204).end()
  })
  .catch(error => next(error)) */
})

blogsRouter.put('/:id', async (request, response, next) => {
  const blog = request.body

  console.log(
    'backend likettäessä body:',
    blog,
    'ja request arams id',
    request.params.id
  )

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true
  }).populate('user', { username: 1, name: 1 })
  console.log('backend updatedBlog', updatedBlog)
  response.json(updatedBlog)
})

// 7.18 kommentointi
blogsRouter.post('/:id/comments', async (request, response, next) => {
  const comment = request.body
  console.log('blogin kommentointi request.body ', request.body)

  const seekedBlog = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    name: 1
  })
  console.log('seekattu blogi: ', seekedBlog, seekedBlog.comments)

  seekedBlog.comments.push(comment)
  console.log(
    'seekedBlog ennen seivausta ja comments pushin jäkkeen',
    seekedBlog
  )
  await seekedBlog.save()
  console.log('seekedBlog seivauksen jälkeen', seekedBlog)
  response.status(200).json(seekedBlog)
})

module.exports = blogsRouter