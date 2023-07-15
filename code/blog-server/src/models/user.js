const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null
  },
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    unique: true,
  },
  admin:{
    type:Boolean,
    default:false,
  },
  avatar: {
    type: String,
    default: null
  },
  email: {
    type: String,
    default: null
  },
  phone: {
    type: Number,
    default: null
  },
})
module.exports = mongoose.model('users', userSchema)