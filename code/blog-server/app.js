const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
dotenv.config()

// 使用swagger API 文档
const swaggerInstall = require('./app/utils/swagger')
const router = require('./app/route')

const app = new express()
fs.chmod(path.join(__dirname, './assets'), 0o700, (err) => {
  console.log(err)
})
app.use(express.static(process.platform == 'win32' ? path.join(__dirname, './assets') : '/var/local/media/nodeAssets'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

app.use(cors())

app.get('/', (req, res, next) => {
  res.send('你好，世界')
})

require('./app/mongodb/conect')
swaggerInstall(app)
router(app)

// 错误捕捉，防止程序崩溃
app.use(function (err, req, res, next) {
  res.send({
    code: 500,
    msg: err.message,
  })
})

app.listen(process.env.port, () => {
  console.log('---------------------------------------------------------------------')
  console.log(`app run at ${process.env.host_path}`)
  console.log(`API 文档 在 http://${process.env.host_path}/api-docs`)
  console.log('---------------------------------------------------------------------')
})
