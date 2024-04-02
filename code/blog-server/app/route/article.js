const _ = require('lodash')
const { Router } = require('express')
const router = Router()
const posts = require('../models/post')
const captchaDb = require('../models/captcha')
// const article = require('../controller/article')
const Middleware = require('../middleware/index')
const moment = require('moment')
const sendData = require('../utils/dataFun')

// 65feac185b722ffab4dc8d5f
/**
 * @swagger
 * tags:
 *  - name: Post
 *    description: 文章
 *
 * components:
 *    schemas:
 *       Post:
 *          type: object
 *          properties:
 *              title:
 *                  in: title
 *                  description: '文章标题'
 *              date:
 *                  in: date
 *                  description: '时间'
 *              body:
 *                  in: body
 *                  description: '内容'
 *              userId:
 *                  in: userId
 *                  description: '用户id'
 */

/**
 * @swagger
 * /api/post/list:
 *  get:
 *      summary: 文章列表
 *      tags: [Post]
 *      parameters:
 *        - name: title
 *          in: query
 *          description: 文章标题
 *      responses:
 *          200:
 *             description: 成功
 *
 */
router.get('/list', async (req, res, next) => {
  const { title } = _.assign(req.body, req.query, req.params)
  console.log(title)
  const regex = new RegExp(title, 'i')
  posts
    .find({ title: regex })
    .sort({ date: -1 })
    .exec((err, data) => {
      sendData(err, data, res)
    })
})
/**
 * @swagger
 * /api/post/detail:
 *  get:
 *      summary: 文章详情
 *      tags: [Post]
 *      parameters:
 *          - name: _id
 *            in: query
 *            description: '文章ID'
 *      responses:
 *          200:
 *             description: 成功
 *
 */
router.get('/detail', async (req, res, next) => {
  console.log(req.params)
  console.log(req.query)
  let { _id } = _.assign(req.body, req.query, req.params)
  try {
    let result = await posts.findOne({ _id: _id })
    res.send({
      data: result,
      status: 200,
    })
  } catch (error) {
    next(error)
  }
})

/**
 * @swagger
 * /api/post/findOneAndUpdate:
 *  post:
 *      summary: 更新文章
 *      tags: [Post]
 *      security:
 *        - basicAuth: []
 *      requestBody:
 *        description: "Update post object"
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                  description: '文章标题'
 *                body:
 *                  type: string
 *                  description: '更新内容'
 *                id:
 *                  type: string
 *                  description: '文章id'
 *                cover:
 *                  type: string
 *                  description: '封面图片'
 *      responses:
 *          200:
 *             description: 成功
 *
 */
router.post('/findOneAndUpdate', (req, res, next) => {
  const { title, body, id, cover, captcha } = req.body
  if (!id) {
    posts.create({ title: title, body: body, cover, captcha }, (err, data) => {
      sendData(err, data, res)
    })
  } else {
    posts.findOneAndUpdate({ _id: id }, { title: title, body: body, cover, captcha }, { upsert: true, new: true }, (err, data) => {
      sendData(err, data, res)
    })
  }
})

/**
 * @swagger
 * /api/post/create-captcha:
 *  get:
 *      summary: 添加文章标签
 *      tags: [Post]
 *      parameters:
 *        - name: text
 *          in: query
 *          description: '添加标签'
 *          required: true
 *          type: "string"
 *      responses:
 *          200:
 *             description: 成功
 *
 */
router.get('/create-captcha', async (req, res, next) => {
  const { text } = req.query
  console.log(req.params)
  console.log(req.query)
  console.log(req.body)
  console.log(text)
  if (!text) {
    res.send({
      msg: '内容不能为空',
    })
    return
  }
  const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  captchaDb.insertMany({ captcha: text, time: date }, (err, data) => {
    sendData(err, data, res)
  })
})

/**
 * @swagger
 * /api/post/captcha:
 *  get:
 *      summary: 文章标签
 *      tags: [Post]
 *      responses:
 *          200:
 *             description: 成功
 *
 */
router.get('/captcha', async (req, res, next) => {
  captchaDb.find({}, (err, data) => {
    sendData(err, data, res)
  })
})

module.exports = router
