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
  readcount: {
    type: Number,
    default: 0,
  },
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
  publicShow: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const post_comments_Schema = new mongoose.Schema({
  u_id: ObjectId,
  p_id: ObjectId,
  content: {
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
  captchaDB: mongoose.model('posts_captcha', captchaSchema),
  post_comment_DB: mongoose.model('post_comment', post_comments_Schema),
}
