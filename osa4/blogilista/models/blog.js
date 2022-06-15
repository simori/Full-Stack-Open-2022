// moduli blogi-skeeman määrittelyyn
const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    if (returnedObject.likes === null) {
      returnedObject.likes = 0
    }
    delete returnedObject._id
    delete returnedObject.__v
    // console.log('luotu objecti', returnedObject.title)
  }
})

module.exports = mongoose.model('Blog', blogSchema)
