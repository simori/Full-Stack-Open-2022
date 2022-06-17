const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/list_helper')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
// const { response } = require('../app')

let testUser

beforeEach(async () => {
  // alustetaan testitietokanta kovakoodatuilla blogeilla testejä varten
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  // kirjaudutaan testikäyttäjällä sisään
  testUser = {
    username: 'tester',
    name: 'teemu testaaja',
    password: 'password'
  }
  await User.deleteMany({})
  console.log('tehdään nyt testikäyttäjä')
  await api
    .post('/api/users')
    .send(testUser)
    .expect(201)
})

// tehtävä 4.8
test('4.8 returns correct number of JSON form blogs?', async () => {
  const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
  expect(response.body.length).toEqual(helper.initialBlogs.length)
})

// tehtävä 4.9*
// palautettujen blogien identifioivan kentän tulee olla nimeltään id.
test('4.9 returned blogs identification field is named id (not _id)?', async () => {
  const response = await api.get('/api/blogs')
  // const blogs = await Blog.find({})
  /*   const response = await api.get('/api/blogs')
  console.log('responsen body on', response.body)
  console.log('response bodyn eka alkio', response.body[0]) */
  console.log('blogs[1].id on', response.body[1].id)
  console.log('blogs[1]._id on', response.body[1]._id)
  // blogs.forEach(i => console.log(i))
  response.body.forEach(i => expect(i.id).toBeDefined())
  response.body.forEach(i => expect(i._id).not.toBeDefined())
})

// tehtävä 4.10
// testi, joka varmistaa, että sovellukseen voi lisätä blogeja osoitteeseen
// /api/blogs tapahtuvalla HTTP POST -pyynnöllä
test('4.10 a valid blog can be added ', async () => {
  const existingBlogs = await api.get('/api/blogs').expect(200)
  console.log('existaavat biogit', existingBlogs.body)
  const loginRes = await api
    .post('/api/login')
    .send(testUser)
    .expect(200)
  console.log('loginRes on', loginRes.body)
  console.log('testUser on', testUser)
  const newBlog = {
    title: 'Uuden bloggaajan uudet tarinat',
    author: 'Artti Mahtisaari',
    url: 'http://markapie.ru',
    likes: 7331,
    user: testUser
  }
  const token = loginRes.body.token
  console.log('postataan apiin')
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const resTitle = response.body.map(r => r.title)
  console.log('resTitle on', resTitle)
  expect(response.body).toHaveLength(existingBlogs.body.length + 1)
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

  const loginRes = await api
    .post('/api/login')
    .send(testUser)
    .expect(200)
  const token = loginRes.body.token

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs').expect(200)
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(response.body[response.body.length - 1]).toBeDefined()
  expect(response.body[response.body.length - 1].likes).toEqual(0)
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

  const loginRes = await api
    .post('/api/login')
    .send(testUser)
    .expect(200)
  const token = loginRes.body.token

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlogWithoutTitleUrl)
    .expect(400)

  const blogsAtEnd = await api.get('/api/blogs').expect(200)
  console.log('blogit lopussa', blogsAtEnd.body)
  expect(blogsAtEnd.body).toHaveLength(helper.initialBlogs.length)
})

// tehtävä 4.13 yksittäisen blogin poistaminen testi
test('4.13 deleting a blog', async () => {
  const blogsAtStart = await api.get('/api/blogs').expect(200)
  /* console.log('blogi alussa', blogsAtStart.body)
  const blog = blogsAtStart.body[0]
  console.log('blogi on', blog) */

  const loginRes = await api
    .post('/api/login')
    .send(testUser)
    .expect(200)
  const token = loginRes.body.token

  const toBeDeleted = {
    title: 'Kukaan Ei Liketä Mua',
    author: 'OMG Angst Alli',
    url: 'http://itkujapar.ku'
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(toBeDeleted)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await api.get('/api/blogs').expect(200)
  console.log('blogilistan pituus ennen poistoa', blogs.body.length, blogs.body)
  expect(blogs.body).toHaveLength(blogsAtStart.body.length + 1)

  await api
    .delete(`/api/blogs/${blogs.body[blogs.body.length - 1].id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const blogsAtEnd = await api.get('/api/blogs').expect(200)
  console.log('blogilistan pituus jälkeen poiston', blogsAtEnd.body.length, blogsAtEnd.body)
  expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length)
})

// tehtävä 4.14 yksittäisen blogin muokkaaminen testi
// editoidaan ekan blogin authori ja tykkäykset
test('4.14 editing a blog', async () => {
  const blogsAtStart = await api.get('/api/blogs').expect(200)
  const blog = blogsAtStart.body[0]
  console.log('blogit alussa', blogsAtStart.body)
  const newBlog = {
    author: 'Märkä Simo',
    likes: 1337666
  }
  await api
    .put(`/api/blogs/${blog.id}`)
    .send(newBlog)
    .expect(200)

  const edited = await Blog.findByIdAndUpdate(blog.id, newBlog, { new: true })

  const blogsAtEnd = await api.get('/api/blogs').expect(200)
  console.log('blogit lopussa', blogsAtEnd.body)
  expect(edited.id).toEqual(blog.id)
  expect(edited.author).not.toEqual(blog.author)
  expect(edited.url).toEqual(blog.url)
  expect(edited.likes).not.toEqual(blog.likes)
  expect(edited.title).toEqual(blog.title)
})

// tehtävä 4.16 ei pitäisi lisätä virheellisiä käyttäjiä
test('4.16 should not add users with non unique username or too short username or pasword?', async () => {
  const usersAtStart = await api.get('/api/users').expect(200)
  const testUserAlreadyExisting = {
    username: 'tester',
    name: 'teemu toinen testaaja',
    password: 'password'
  }
  const testUserTooShortName = {
    username: 'te',
    name: 'liian lyhyt nimi',
    password: 'salsu345'
  }
  const testUserTooShortPassword = {
    username: 'tester234',
    name: 'liian lyhyt passu',
    password: 'xd'
  }
  await api
    .post('/api/users')
    .send(testUserAlreadyExisting)
    .send(testUserTooShortName)
    .send(testUserTooShortPassword)
    .expect(400)
  const usersAtEnd = await api.get('/api/users').expect(200)
  expect(usersAtStart.body).toHaveLength(usersAtEnd.body.length)
})

// tehtävä 4.23
// editoidaan ekan blogin authori ja tykkäykset
test('4.23 should not able to add new blog if no token included?', async () => {
  const existingBlogs = await api.get('/api/blogs').expect(200)
  console.log('existaavat biogit', existingBlogs.body)
  const testUserWithoutToken = {
    username: 'tester',
    name: 'teemu testaaja',
    password: 'password'
  }
  const loginRes = await api
    .post('/api/login')
    .send(testUserWithoutToken)
    .expect(200)

  console.log('loginRes on', loginRes.body)

  const newBlog = {
    title: 'EpäOnnistui!',
    author: 'Artti Mahtisaari',
    url: 'http://markapie.ru',
    likes: 7331,
    user: testUserWithoutToken
  }
  // const token = loginRes.body.token
  console.log('postataan apiin, pitäisi heittää 401')
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)

  const blogsAtEnd = await api.get('/api/blogs').expect(200)
  expect(blogsAtEnd.body).toHaveLength(existingBlogs.body.length)
})

afterAll(() => {
  mongoose.connection.close()
})
