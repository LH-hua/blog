const mongoose = require('mongoose')
const prejectSchema = new mongoose.Schema({
  title: {
    type: String,
    default: null,
  },
  subtitle: {
    type: String,
    default: null,
  },
  cover: {
    type: String,
    default: null,
  },
})
module.exports = mongoose.model('preject', prejectSchema)
