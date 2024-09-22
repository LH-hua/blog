const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

const captchaSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
  },
  text: { type: String },
  date: {
    type: Date,
    default: Date.now,
  },
})

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  u_id: ObjectId,
  cover: {
    type: String,
    default: '',
  },
  descr: {
    type: String,
    default: '',
  },
  body: {
    type: String,
    required: true,
  },
  captcha_id: [ObjectId],
  date: {
    type: Date,
    default: Date.now,
  },
})
module.exports = {
  postDB: mongoose.model('posts', postSchema),
  captchaDB: mongoose.model('posts_captcha', captchaSchema),
}
