const mongoose = require('mongoose')
const menuSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  pid: {
    type: String,
    default: '',
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
  path: {
    type: String,
  },
  meta: {
    type: Object,
    default: { keywords: '', description: '' },
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
  Menu: mongoose.model('menu', menuSchema),
  sysDb: mongoose.model('sys', sysSchema),
  about_DB: mongoose.model('about', aboutSchema),
}
