const mongoose = require('mongoose')
const moment = require('moment')
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  id: Number,
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
  userId: {
    type: String,
    default: '',
  },
  date: {
    type: Date,
    default: Date.now,
  },
})
module.exports = mongoose.model('posts', postSchema)
