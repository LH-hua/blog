const mongoose = require('mongoose')
const { dbUrl } = require('../config/mongo.config')
mongoose.set('strictQuery', true)
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log(`已连接至${dbUrl}数据库`)
  })
  .catch((err) => console.log(err))
module.exports = mongoose
