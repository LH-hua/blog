const mongoose = require('mongoose')

const captchaSchema = new mongoose.Schema({
  captcha: {
    type: String,
    default: '',
  },
  text: { type: String },
  time: {
    type: Date,
    default: Date.now,
  },
})

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  id: String,
  userId: Number,
  cover: {
    type: String,
    default: '',
  },
  descr: {
    type: String,
    default: null,
  },
  body: {
    type: String,
    required: true,
  },
  captcha: {
    type: Array,
    default: [],
  },
  captchas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'captcha' }],
  userId: {
    type: String,
    default: '',
  },
  date: {
    type: Date,
    default: Date.now,
  },
})
module.exports = {
  postDB: mongoose.model('posts', postSchema),
  captchaDB: mongoose.model('captcha', captchaSchema),
}
