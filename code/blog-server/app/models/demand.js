const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

const demandSchema = new mongoose.Schema({
  u_id: ObjectId,
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
  demandDB: mongoose.model('demand', demandSchema),
}
