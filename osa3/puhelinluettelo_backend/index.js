require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()

const Person = require('./models/person')

app.use(express.json())

//tehtävä 3.9
const cors = require('cors')

app.use(cors())
// tehtävä 3.11
app.use(express.static('build'))

// tehtävä 3.8
morgan.token('content', function getContent(req) {
  const str = JSON.stringify(req.body)
  if (str.length > 2) return str
  else return ' '
})
//app.use(morgan('tiny')) /* tehtävä 3.7*/

// tehtävä 3.8
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
/*
tinyy
The minimal output.

:method :url :status :res[content-length] - :response-time ms
*/


app.get('/', (req, res) => {
  res.send('<h1>Puhelinluettelon bäkkäri!</h1><p>eli siis backend...</p>')

})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

// tehtävä 3.2
app.get('/info', (req, res) => {

  /* res.send(`<p>Phonebook has infofor ${persons.length} people!</p>
    <p>This request was made on ${new Date()}!</p>
    `) */

  // 3.18
  Person.find({}).then(persons => {
    res.send(`<p>Phonebook has info for ${persons.length} people!</p>
    <p>This request was made on ${new Date()}!</p>`
    )
  })
})

// tehtävä 3.3 yksittäisen personin hakeminen
app.get('/api/persons/:id', (request, response, next) => {
  Person
    .findById(request.params.id)
    .then(person => {
      //console.log('get person by id person on ', person)
      if (person) {
        response.json(person)
      }
      else {
        response.status(404).end()
      }
    })
    .catch(err =>
      next(err)
    )
})

// tehtävä 3.5
app.post('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => {
    const { name, number } = request.body
    // 3.6 virheenkäsittely
    // nimikenttä tyhjänä -> huono pyyntö
    if (!name) {

      return response.status(400).json({
        error: 'Cannot add entry because no name was given!'
      })
    }
    // numerokenttä tyhjänä -> huono pyyntö
    else if (!number) {
      return response.status(400).json({
        error: 'Cannot add entry because no number was given!'
      })
    }
    // nimi löytyy jo luettelosta -> konflikti
    else if (persons.find(p => p.name === name)) {
      return response.status(409).json({
        error: 'Cannot add entry because that name is already found in the phonebook!'
      })
    }
    // 3.19
    /* if (name.length < 3) {
            return response.status(400).json({
                error: 'ei voi lisätä koska nimi alle 3 merkkiä!'
            })
        } */

    const person = new Person({
      name: name,
      number: number
    })

    person.save().then(savedPerson => {
      response.json(savedPerson)
    }).catch(error => next(error))
  })
    .catch(error => next(error))

})

// 3.17
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: number, runValidators: true, context: 'query' })
    .then(updatedEntry => {
      response.json(updatedEntry)
    })
    .catch(error => next(error))
})

// tehtävä 3.4
app.delete('/api/persons/:id', (request, response, next) => {

  // tehtävä 3-15
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))

})

// tehtävä 3.16
const errHandler = (error, request, response, next) => {
  console.error('virhe koodilla ', error.code, '\n\n')
  console.error(error.message)

  /* if (error.code === 404) {
        return response.status(404).send({ error: 'ei löytynyt!' })
    } */
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id!' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }


  next(error)
}
// tämä tulee kaikkien muiden middlewarejen rekisteröinnin jälkeen!
app.use(errHandler)

// avataan yhteys
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`)
})