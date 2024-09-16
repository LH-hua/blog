const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
  },
  username: {
    type: String,
    unique: true,
  },
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
  phone: {
    type: Number,
    default: '',
  },
})
const userPostSchema = new mongoose.Schema({
  u_id: ObjectId,
  p_id: [ObjectId],
})
module.exports = {
  User: mongoose.model('users', userSchema),
  userPost: mongoose.model('userPost', userPostSchema),
}
