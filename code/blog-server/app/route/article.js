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
 *      parameters: []
 *      responses:
 *          200:
 *             description: 成功
 *
 */
router.get('/list', async (req, res, next) => {
  try {
    let result = await posts.find({}).sort({ date: -1 })
    return res.send({
      data: result,
      status: 200,
    })
  } catch (error) {
    next(error)
  }
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
//   security: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmVhYzE4NWI3MjJmZmFiNGRjOGQ1ZiIsInVzZXJuYW1lIjoidGVzdCIsInBhc3N3b3JkIjoiJDJhJDEwJHVjUS9lM1gzd3NDRElBZ1FqVmFuSS53OEg3SExXSVZDNFBxeU4uYm9FeEVmVFlveDZiN3MuIiwiaWF0IjoxNzExMTg5NDI2fQ.CHKgUDuup4YPcCOvVT_-HpogWbPt2PPe3auomNxW9V8'

/**
 * @swagger
 * /api/post/create:
 *  post:
 *      summary: 新增文章
 *      tags: [Post]
 *      security:
 *        - basicAuth: []
 *      requestBody:
 *        description: "Created post object"
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Post'
 *      responses:
 *          200:
 *             description: 成功
 *
 */
router.post('/create', async (req, res, next) => {
  try {
    const { title, body, userId } = req.body
    const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    posts.insertMany(
      {
        date: date,
        title: title,
        body: body,
        userId: userId,
      },
      (err, data) => {
        sendData(err, data, res)
      }
    )
  } catch (error) {}
})

/**
 * @swagger
 * /api/post/update:
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
router.post('/update', (req, res, next) => {
  const { title, body, id, cover } = req.body
  if (!id) {
    return res.send({
      msg: '文章id不能为空！',
    })
  }
  posts.findOneAndUpdate({ _id: id }, { title: title, body: body, cover }, (err, data) => {
    sendData(err, data, res)
  })
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
