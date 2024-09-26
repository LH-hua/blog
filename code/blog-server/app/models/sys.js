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

const aboutSchema = new mongoose.Schema({
  text: String,
})
const sysSchema = new mongoose.Schema({
  announcement: {
    type: String,
    default: '',
  },
})
module.exports = {
  menuDb: mongoose.model('menu', menuSchema),
  sysDb: mongoose.model('sys', sysSchema),
  about_DB: mongoose.model('about', aboutSchema),
}
