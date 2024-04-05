const mongoose = require('mongoose')
const rootSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  about: {
    type: String,
    default: null,
  },
  cover: {
    type: String,
    default: null,
  },
  contact: {
    type: Array,
    default: [],
  },
})
module.exports = mongoose.model('root', rootSchema)
