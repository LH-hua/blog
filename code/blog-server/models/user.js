const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
  },
  username: {
    type: String,
  },
  text: String,
  password: {
    type: String,
    unique: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    default: '/avatar/default.png',
  },
  email: {
    type: String,
    default: '',
  },
  sex: String,
  phone: {
    type: Number,
    default: '',
  },
  lv: {
    type: Number,
    default: 0,
  },
  coins: {
    type: Number,
    default: 3,
  },
})
module.exports = {
  User: mongoose.model('users', userSchema),
}
