const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// .populate('blogs', { title: 1, author: 1, url: 1 })
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
  // console.log('users', users)
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'that user already exists! cannot create user with name that already exist!'
    })
  } else if (password.length < 3) {
    return response.status(400).json({
      error: 'sorry, your password isnt long enough! so cannot create user!'
    })
  } else if (username === null) {
    return response.status(400).json({
      error: 'cannot create user because no username was given!'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter
