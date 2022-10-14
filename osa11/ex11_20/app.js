// implementing mock API so that the app works in Heroku
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('anecdotes.json')
const middlewares = jsonServer.defaults()
const express = require('express')

const PORT = process.env.PORT || 3000 // frontend 3000, backend 3001
console.log(PORT)
server.use('/api', middlewares, router)

// Add custom routes before JSON Server router
server.get('/health', (req, res) => {
  res.send('All Good Everything!')
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})
server.use(express.static('build'))

server.listen(PORT, () => {
  console.log(`JSON Server is running on ${PORT}!`)
})