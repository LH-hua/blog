const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

const pastBooksSchema = new mongoose.Schema({
  u_id: ObjectId,
  title: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  cover: String,
  captcha_id: [ObjectId],
  date: {
    type: Date,
    default: Date.now,
  },
})
const pastBooks_captchas_catSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
})
module.exports = {
  pastBookDB: mongoose.model('pastBooks', pastBooksSchema),
  pastBooks_captchas_db: mongoose.model('pastBooks_captchas', pastBooks_captchas_catSchema),
}
