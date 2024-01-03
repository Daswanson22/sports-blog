const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  postDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  pid: {
    type: Number,
    required: true,
    default: 1 // This will be a function retrieving the id from the from.
  }
})

module.exports = mongoose.model('articles', articleSchema)