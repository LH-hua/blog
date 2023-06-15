
const posts = require('../models/post')
const _ = require('lodash')
const moment = require('moment')


const article = {
    articles: async (req, res, next) => {
        try {
            let result = await posts.find({}, { body: 0 })
            // console.log(result)
            res.send({
                msg: result
            })
        } catch (error) {
            next(error)
        }
    },
    detail: async (req, res, next) => {
        let { _id } = _.assign(req.body, req.query, req.params)
        try {
            let result = await posts.findOne({ _id: _id })
            res.send(result)
        } catch (error) {
            next(error)
        }
    },
    add: async (req, res) => {
        const { title, body } = req.body
        const result = await posts.create({
            dete: moment().format('YYYY-MM-DD HH:mm:ss'),
            title: title,
            body: body
        })
        if (result) {
            res.send({
                type: 'success',
                msg: '文章添加成功了'
            })
        }
    }
}
module.exports = article