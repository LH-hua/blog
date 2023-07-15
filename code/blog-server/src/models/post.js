const mongoose = require('mongoose');
const moment = require('moment');
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    id: Number,
    userId: Number,
    descr: {
        type: String,
        default: null
    },
    body: {
        type: String,
        required: true
    },
    userId:{
        type:String,
        default:'',
    },
    date: {
        type: String,
        default: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    },
})
module.exports = posts = mongoose.model('posts', postSchema)