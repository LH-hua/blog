const mongoose = require('mongoose')
const menuSchema = new mongoose.Schema({
  pid: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  url: {
    type: String,
    default: '',
  },
  path: {
    type: String,
    default: '',
  },
  meta: {
    type: Object,
    default: { keywords: '', description: '', isLogin: false },
  },
  show: {
    type: Boolean,
    default: true,
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
