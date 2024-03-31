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

const sysSchema = new mongoose.Schema({})
module.exports = {
  menu: mongoose.model('menu', menuSchema),
  sys: mongoose.model('sys', sysSchema),
}
