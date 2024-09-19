const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

const easyHouseSchema = new mongoose.Schema({
  u_id: ObjectId,
  title: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  captcha_id: [ObjectId],
  date: {
    type: Date,
    default: Date.now,
  },
})
module.exports = {
  easyDB: mongoose.model('easyHouse', easyHouseSchema),
}
