const mongoose = require('mongoose')

const captchaSchema = new mongoose.Schema({
  captcha: {
    type: String,
    default: '',
  },
  time: {
    type: String,
    default: '',
  },
})

module.exports = mongoose.model('captcha', captchaSchema)
