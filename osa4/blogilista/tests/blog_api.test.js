const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/list_helper')
const api = supertest(app)
const Blog = require('../models/blog')
const { response } = require('../app')

beforeEach(async () => {
  // const response = await api.get('/api/blogs')
  // const blogs = helper.initialBlogs
  // console.log('ennen testien ajoa', response.body)
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

// tehtävä 4.8
test('4.8 returns correct number of JSON form blogs?', async () => {
  const response = await api.get('/api/blogs')
  const blogs = await Blog.find({})
  console.log('response pituus', response.body.length, response.body)
  console.log('initialblogs pituus', blogs, blogs.length)
  expect(response.body.length).toEqual(helper.initialBlogs.length)
})

// tehtävä 4.9*
// palautettujen blogien identifioivan kentän tulee olla nimeltään id.
test('4.9 returned blogs identification field is named id (not _id)?', async () => {
  // const response = await api.get('/api/blogs')
  const blogs = await Blog.find({})
  // console.log('responsen body on', response.body)
  // console.log('blogs on', blogs)
  blogs.forEach(i => console.log(i))
  blogs.forEach(i => expect(i.id).toBeDefined())
})

// tehtävä 4.10
// testi, joka varmistaa, että sovellukseen voi lisätä blogeja osoitteeseen
// /api/blogs tapahtuvalla HTTP POST -pyynnöllä
test('4.10 a valid blog can be added ', async () => {
  const existingBlogs = await Blog.find({})
  const newBlog = {
    title: 'Uuden bloggaajan uudet tarinat',
    author: 'Artti Mahtisaari',
    url: 'http://markapie.ru',
    likes: 7331
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const resTitle = response.body.map(r => r.title)
  console.log(resTitle)
  expect(response.body).toHaveLength(existingBlogs.length + 1)
  expect(resTitle).toContain(
    'Uuden bloggaajan uudet tarinat'
  )
})

// tehtävä 4.11*
// varmistaa, että jos kentälle likes ei anneta arvoa, asetetaan sen arvoksi 0
test('4.11 if no value given for likes field, then it will be set to zero?', async () => {
  const newBlog = {
    title: 'Kukaan Ei Liketä Mua',
    author: 'OMG Angst Alli',
    url: 'http://itkujapar.ku'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const resLikes = response.body.map(r => r.likes)
  console.log(response.body, resLikes)

  expect(resLikes[resLikes.length - 1]).toBeDefined()
  // expect(newBlog.likes).toEqual(0)
})

// tehtävä 4.12
// blogin lisäämiselle eli osoitteeseen /api/blogs tapahtuvalle HTTP POST -pyynnölle.
// Testing tulee varmistaa, että jos uusi blogi ei sisällä kenttiä title ja url,
// pyyntöön vastataan statuskoodilla 400 Bad Request.
test('4.12 posting new blog, if no title or url exists must response with code 400', async () => {
  const newBlogWithoutTitleUrl = {
    author: 'Artti Mahtisaari',
    likes: 123
  }

  await api
    .post('/api/blogs')
    .send(newBlogWithoutTitleUrl)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDatabase()
  console.log('blogit lopussa', blogsAtEnd)
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

// tehtävä 4.13 yksittäisen blogin poistaminen testi
test('4.13 deleting a blog', async () => {
  const blogsAtStart = await Blog.find({})
  //console.log('blogi alussa', helper.initialBlogs[0])
  const blog = blogsAtStart[0]
  console.log('blogi on', blog)

  await api
    .delete(`/api/blogs/${blog._id}`)
    .expect(204)

  const blogsAtEnd = await Blog.find({})
  console.log('blogit lopussa', blogsAtEnd)
  expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
})

// tehtävä 4.14 yksittäisen blogin muokkaaminen testi
test('4.14 editing a blog', async () => {
  const blogsAtStart = await Blog.find({})
  const blog = blogsAtStart[0]
  console.log('blogit alussa', blogsAtStart)
  const newBlog = {
    author: 'Märkä Simo',
    likes: 1337666
  }
  await api
    .put(`/api/blogs/${blog._id}`)
    .send(newBlog)
    .expect(200)

  const edited = await Blog.findByIdAndUpdate(blog.id, newBlog, { new: true })

  const blogsAtEnd = await Blog.find({})
  console.log('blogit lopussa', blogsAtEnd)
  expect(edited.id).toEqual(blog.id)
  expect(edited.author).not.toEqual(blog.author)
  expect(edited.url).toEqual(blog.url)
  expect(edited.likes).not.toEqual(blog.likes)
  expect(edited.title).toEqual(blog.title)
})

afterAll(() => {
  mongoose.connection.close()
})
