const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");




// 使用swagger API 文档
const swaggerInstall = require('./utils/swagger/index')

const port = 3333
const host = 'localhost'

const app = new express();


swaggerInstall(app)

// app.use(require('./mongodb/conect'))
app.use(require('./route/article'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())
require('./mongodb/conect')

// app.use(require('./route/article'))
app.listen(port, () => {
	console.log(`app run at http://${host}:${port}`)
} )