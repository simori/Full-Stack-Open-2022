const express = require('express')
const app = express()

// Heroku dynamically sets a port
const PORT = process.env.PORT || 5000

app.use(express.static('dist'))

// 11.11
app.get('/health', (req, res) => {
  res.send('ok!')
})

app.get('/easteregg', (req, res) => {
  res.send('lisää koodia kansalle!')
})

app.get('/version', (req, res) => {
  res.send('1.x.yzzy') // change this string to ensure a new version deployed
})

app.listen(PORT, () => {
  console.log('server started on port 5000') //eslint-disable-line
})
