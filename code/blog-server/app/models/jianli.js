const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

const jianliSchema = new mongoose.Schema({
  imgPath: String,
  docPath: [String],
  listPath: [String],
  key: [String],
})
const jianli = mongoose.model('jinali', jianliSchema)

module.exports = {
  jianli_DB: jianli,
}
