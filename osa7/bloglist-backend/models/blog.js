// moduli blogi-skeeman määrittelyyn
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  comments: [
    // tehtävä 7.18
    { type: Object }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
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
