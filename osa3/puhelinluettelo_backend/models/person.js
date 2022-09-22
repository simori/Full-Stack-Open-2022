//TEHTÄVÄ 3.13
const mongoose = require('mongoose')

//const url = process.env.MONGODB_URI
const url = `mongodb+srv://fullstacksimppa:${process.env.MONGODB_PASS}@cluster0.tisx0.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`
console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB!')
  })
  .catch((error) => {
    console.log('!error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: true },
  // 3.20*
  number: { type: String, validate: {
    validator: function(v) {
      return /^(\d{2}-\d{5,})$|^(\d{3}-\d{4,})$/.test(v)
    },
    message: props => `${props.value} is not a valid phone number!`
  },
  required: true }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)