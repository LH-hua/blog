const mongoose = require('mongoose');
const moment = require('moment')

/*
    数据结构
    posts    数据库名称
    title       文章标题
    content     文章内容
    describe    文章描述
    date        入库时间
    class       分类
*/
const article = mongoose.model(
    'posts',
    new mongoose.Schema(
        {
            title: {
                type:String,
                required:true
            },
            id: Number,
            userId: Number,
            descr:{
                type:String,
                default: ''
            },
            body: {
                type:String,
                required:true
            },
            date: {
                type:String,
                default:moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            },
        }
    )
)
/*
    用户名称
*/

const user = mongoose.model(
    'users',
    new mongoose.Schema(
        {
            _id: Object,
            name: String,
            username: String,
            password: String,
            email: String,
            phone: Number,
            address: Object,
        }
    )
)

const comments = mongoose.model(
    'comment',
    new mongoose.Schema(
        {
            _id: Object,
            id:Number,
            userId:Number,
            postId:Number,
            email:String,
            body:String,
            title:String,
        }
    )
)


module.exports = {
    article,
    user,
    comments
}