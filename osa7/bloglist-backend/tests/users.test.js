const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/list_helper')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  // alustetaan testitietokanta kovakoodatuilla blogeilla testejä varten
  await User.deleteMany({})
  // await User.insertMany(helper.initialBlogs)
})

describe('testing user adding!', () => {
  test('4.16 should not be able to add malformed user', async () => {
    const users = [
      {
        // no username given
        blogs: [],
        username: '',
        name: 'Ano Nyyminen',
        password: '123456'
      },
      {
        // too short username given
        blogs: [],
        username: 'Al',
        name: 'Al Coholic',
        password: 'gambina'
      },
      {
        // no password given
        blogs: [],
        username: 'simo1',
        name: 'Simppa',
        password: ''
      },
      {
        // too short password given
        blogs: [],
        username: 'simo2',
        name: 'Simppa',
        password: 'a'
      }
    ]
    await users.forEach((u) => {
      api.post('/api/users').send(u).expect(400)
    })
  })

  test('should not be able to add user that already exists', () => {
    const user = {
      blogs: [],
      username: 'simo1',
      name: 'Simppa',
      password: 'password'
    }

    const another = {
      blogs: [],
      username: 'simo1',
      name: 'Simo Riihimäki',
      password: '4rKL4df9Ö#d'
    }

    api.post('/api/users').send(user).expect(201)

    api.post('/api/users').send(another).expect(400)
  })
})
