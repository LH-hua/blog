const mongoose = require('mongoose')

const frontMatterSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  date: {
    type: String,
  },
  description: {
    type: String,
  },
  layout: {
    type: String,
  },
  categories: {
    type: String,
  },
  postId: {
    type: String,
  },
})

module.exports = captcha = mongoose.model('frontMatter', frontMatterSchema)
