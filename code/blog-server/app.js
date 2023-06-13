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
app.use(express.json())
app.use(cors())
require('./mongodb/conect')
swaggerInstall(app)
router(app)
app.use('/',() => {
	throw new Error('服务器内部错误')
})

app.use(function(err,req,res,next){
	res.send({
		msg:err.message
	})
})

// app.use(require('./route/article'))
app.listen(port, () => {
	console.log(`app run at http://${host}:${port}`)
} )