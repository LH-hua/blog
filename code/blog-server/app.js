const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// 主机运行配置文件
const { port, hostUrl } = require('./src/config/host.config')

// 使用swagger API 文档
const swaggerInstall = require('./src/utils/swagger')
const router = require('./src/route')

const app = new express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

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