
const posts = require('../models/post')
const _ = require('lodash')
const moment = require('moment')


const article = {
  articles: async (req, res, next) => {
    try {
      let result = await posts.find({}, { body: 0 }).sort({ date: -1 })
      // console.log(result)
      res.send({
        data: result,
        status: 200
      })
    } catch (error) {
      next(error)
    }
  },
  detail: async (req, res, next) => {
    let { _id } = _.assign(req.body, req.query, req.params)
    try {
      let result = await posts.findOne({ _id: _id })
      res.send({
        data: result,
        status: 200
      })
    } catch (error) {
      next(error)
    }
  },
  add: async (req, res) => {
    try {
      const { title, body } = req.body
      const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      console.log(date)
      const result = await posts.insertMany({
        date: date,
        title: title,
        body: body
      })
      if (result) {
        res.send({
          type: 'success',
          status: 200,
          msg: '文章添加成功了'
        })
      }
    } catch (error) {

    }
  }
}
module.exports = article