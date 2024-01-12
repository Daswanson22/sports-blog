const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    meta_summary: {
      type: String,
      required: true,
      maxLength: 160
    },
    content: {
      type: String,
      required: true
    },
    links: {
      type: String
    },
    username: {
      type: String,
      required: true,
      set: toLower
    }
  },
  {timestamps: true}
)

function toLower(string)
{
  return string.toLowerCase();
}

module.exports = mongoose.model('articles', articleSchema)