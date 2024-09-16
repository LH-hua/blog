const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const { authenticateToken } = require('./app/middleware')
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

app.post('/api/post/*', authenticateToken)
app.get('/api/user/info', authenticateToken)

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

app.listen(3333, () => {
  console.log('---------------------------------------------------------------------')
  console.log(`app run at http://127.0.0.1:3333`)
  console.log(`API 文档 在 http://127.0.0.1:3333/api-docs`)
  console.log('---------------------------------------------------------------------')
})
