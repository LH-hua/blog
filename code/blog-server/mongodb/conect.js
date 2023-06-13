const mongoose = require('mongoose');
const host = "lhua.top"
const port = 27017
const dataBase = "blog"
mongoose.connect(`mongodb://${host}:${port}/${dataBase}`,{ useUnifiedTopology: true })
		.then(() => {
			console.log('数据库链接成功.')
		})
		.catch(err => console.log(err))
module.exports = mongoose