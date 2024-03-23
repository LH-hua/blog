const mongoose = require('mongoose')
const moment = require('moment')

const captchaSchema = new mongoose.Schema({
  captcha: {
    type: String,
    default: '',
  },
  time: {
    type: String,
    default: moment().format('YYYY-MM-DD HH:mm:ss'),
  },
})

module.exports = mongoose.model('captcha', captchaSchema)
