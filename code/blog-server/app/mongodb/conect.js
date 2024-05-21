const mongoose = require('mongoose')
mongoose
  .connect(`mongodb://${process.env.dbUserName}:${process.env.dbPassword}@${process.env.host_path}:${process.env.dbPort}/${process.env.dbName}`)
  .then(() => {
    console.log(`已连接数据库`)
  })
  .catch((err) => console.log(err))
module.exports = mongoose
