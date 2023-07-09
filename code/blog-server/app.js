const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path")
const fs = require("fs")

// 主机运行配置文件
const { port, hostUrl } = require('./src/config/host.config')

// 使用swagger API 文档
const swaggerInstall = require('./src/utils/swagger')
const router = require('./src/route')

const app = new express();
fs.chmod(path.join(__dirname, './assets'), 0o700, (err) => {
  console.log(err)
})
app.use(express.static(process.platform == 'win32' ? path.join(__dirname, './assets') : '/var/local/media/nodeAssets'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())


app.use(cors())

app.get('/',(req,res,next) => {
	res.send('你好，世界')
})

require('./src/mongodb/conect')
swaggerInstall(app)
router(app)

// 错误捕捉，防止程序崩溃
app.use(function (err, req, res, next) {
	res.send({
		code:500,
		msg: err.message
	})
})

app.listen(port, () => {
	console.log('---------------------------------------------------------------------')
	console.log(`app run at ${hostUrl}`)
	console.log(`API 文档 在 ${hostUrl}/swagger`)
	console.log('---------------------------------------------------------------------')
})