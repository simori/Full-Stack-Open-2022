const frontpageRouter = require('express').Router()

frontpageRouter.get('/', (request, response) => {
  response.send('<b>MOIKKULI TÄÄ ON BLOGISIVU</b>')
})

module.exports = frontpageRouter