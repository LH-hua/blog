const mongoose = require('mongoose');
const { dbUrl } = require('../config/mongo.config')
mongoose.connect(dbUrl, { useUnifiedTopology: true })
	.then(() => {
		console.log('数据库链接成功.')
	})
	.catch(err => console.log(err))
module.exports = mongoose