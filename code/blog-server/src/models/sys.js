const mongoose = require('mongoose')
const menuSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  pid: {
    type: String,
  },
  name: {
    type: String,
  },
  icon: {
    type: String,
  },
  url: {
    type: String,
  },
  children: {
    type: Array,
    default: [],
  },
})
module.exports = posts = mongoose.model('menu', menuSchema)
