const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");




// 使用swagger API 文档
const swaggerInstall = require('./utils/swagger/index')
const router = require('./route')

const port = 3333
const host = 'localhost'

const app = new express();




// app.use(require('./mongodb/conect'))
// app.use(require('./route/article'))
// app.use('/api',require('./route/index'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())
require('./mongodb/conect')
swaggerInstall(app)
router(app)

// app.use(require('./route/article'))
app.listen(port, () => {
	console.log(`app run at http://${host}:${port}`)
} )