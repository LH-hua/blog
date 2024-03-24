const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
mongoose
  .connect(process.env.mongodb_path)
  .then(() => {
    console.log(`已连接至${process.env.mongodb_path}数据库`)
  })
  .catch((err) => console.log(err))
module.exports = mongoose
