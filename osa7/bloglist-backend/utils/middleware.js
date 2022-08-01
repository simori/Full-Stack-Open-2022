// kaikki itse toteutetut middlewaret tänne
const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('Token:  ', request.token)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error('FAIL', error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: 'too short username was given!' })
  } else if (error.name === 'TypeError') {
    return response
      .status(400)
      .json({ error: 'blog not found! or other bad error happened!' })
  } else if (error.name === 'JsonWebTokenError') {
    return response
      .status(401)
      .json({ error: 'unauthorized because token not provided or invalid!' })
  }

  next(error)
}

// 4.20
// tehtävä 4.19
const tokenExtractor = (request, response, next) => {
  // ottaa tokenin authorization hederistä
  const authorization = request.get('authorization')
  console.log('authorizaato:', authorization)
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
    // console.log('okei! laitetaan eteenpäin!', request.token)
    // return request.token
  }
  next()
}

// tehtävä 4.22
const userExtractor = (request, response, next) => {
  // ottaa tokenin authorization hederistä
  const gottenUser = request.body.user
  console.log('userextractor middleware user:', gottenUser)
  // console.log('requesti:', request)
  if (gottenUser) {
    request.user = gottenUser
    console.log('okei! laitetaan eteenpäin!', request.user)
    // return request.token
  }
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
