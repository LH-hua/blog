const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

const jianliSchema = new mongoose.Schema({
  imgPath: String,
  docPath: [String],
  listPath: [String],
  key: [String],
})
const jianli_captcha_Schema = new mongoose.Schema({
  text: String,
  name: String,
})
const jianli = mongoose.model('jianli', jianliSchema)
const jianli_captcha = mongoose.model('jianli_captcha', jianli_captcha_Schema)

module.exports = {
  jianli_DB: jianli,
  jianli_captcha_DB: jianli_captcha,
}
