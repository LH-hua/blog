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
module.exports = {
  pastBookDB: mongoose.model('pastBooks', pastBooksSchema),
}
