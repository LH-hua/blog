const _ = require('lodash')
const { Router } = require('express')
const router = Router()
const { postDB, captchaDB } = require('../../models/post')
const { User } = require('../../models/user')
const moment = require('moment')
const sendData = require('../../utils/dataFun')
const { ObjectId } = require('mongodb')
const {} = require('mongoose')

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
 *        - name: captcha_id
 *          in: query
 *          description: 分类id
 *      responses:
 *          200:
 *             description: 成功
 *
 */
router.get('/list', async (req, res, next) => {
  const { title, captcha, captcha_id } = _.assign(req.body, req.query, req.params)
  const regexTile = new RegExp(title, 'i')
  // const regexCaptch = new RegExp(captcha, 'i')
  const query = {
    title: regexTile,
  }
  if (captcha_id) {
    query.captcha_id = ObjectId(captcha_id)
  }
  const data = await postDB.aggregate([
    {
      $match: query,
    },
    {
      $lookup: { from: 'captchas', localField: 'captcha_id', foreignField: '_id', as: 'captchas_info' },
    },
    {
      $lookup: { from: 'users', localField: 'u_id', foreignField: '_id', as: 'auther' },
    },
    {
      $unwind: '$auther',
    },
    {
      $project: {
        captcha_id: 0,
        body: 0,
        'auther.password': 0,
        'auther.email': 0,
        'auther.phone': 0,
        'auther.admin': 0,
        'auther.name': 0,
      },
    },
    {
      $sort: { date: -1 },
    },
  ])
  sendData('', data, res)
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
  let { _id } = _.assign(req.body, req.query, req.params)
  try {
    // let result = await postDB.findOne({ _id: _id })
    // res.send({
    //   data: result,
    //   status: 200,
    // })
    const result = await postDB.aggregate([
      {
        $match: { _id: ObjectId(_id) },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'u_id',
          foreignField: '_id',
          as: 'auther',
        },
      },
      {
        $unwind: '$auther',
      },
      {
        $project: {
          'auther.password': 0,
          'auther.email': 0,
          'auther.phone': 0,
          'auther.admin': 0,
          'auther.name': 0,
          'auther._id': 0,
        },
      },
    ])
    res.send({
      data: result[0],
      status: 200,
    })
  } catch (error) {
    next(error)
  }
})
/**
 * @swagger
 * /api/post/new:
 *  get:
 *      summary: 前十条数据
 *      tags: [Post]
 *      responses:
 *          200:
 *             description: 成功
 *
 */

router.get('/new', async (req, res, next) => {
  const data = await postDB.find({}, { body: 0, captchas: 0, captcha: 0, descr: 0 }).sort({ date: -1 }).limit(10)
  sendData('', data, res)
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
router.post('/findOneAndUpdate', async (req, res, next) => {
  const { u_id, title, body, _id, cover, captcha_id, descr } = req.body
  if (!_id) {
    postDB.create({ u_id: ObjectId(u_id), title: title, body: body, cover, captcha_id, descr }, (err, data) => {
      sendData(err, data, res)
    })
  } else {
    // const data = await captchaDB.find({ captcha: { $in: captcha } })
    // const captchas = data.map((item) => item._id)
    const captcha_id_arr = captcha_id.map((item) => ObjectId(item))
    console.log(req.body)
    postDB
      .findOneAndUpdate(
        { _id: ObjectId(_id) },
        { u_id: ObjectId(u_id), title: title, body: body, cover, descr, captcha_id: captcha_id_arr },
        { upsert: true, new: true }
      )
      .exec((err, data) => {
        sendData(err, data, res)
      })
  }
})
/**
 * @swagger
 * /api/post/delete:
 *  post:
 *      summary: 删除文章
 *      tags: [Post]
 *      requestBody:
 *        description: "Update post object"
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                  description: '文章id'
 *      responses:
 *          200:
 *             description: 成功
 *
 */
router.post('/delete', async (req, res, next) => {
  const result = await postDB.deleteOne({ _id: ObjectId(req.body._id) })
  sendData('', result, res)
})

/**
 * @swagger
 * /api/post/create-captcha:
 *  post:
 *      summary: 添加文章标签
 *      tags: [Post]
 *      requestBody:
 *        description: "Update post object"
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                captcha:
 *                  type: string
 *                  description: '分类标签'
 *                text:
 *                  type: string
 *                  description: '标签描述'
 *                _id:
 *                  type: string
 *                  description: '标签id'
 *      responses:
 *          200:
 *             description: 成功
 *
 */
router.post('/create-captcha', async (req, res, next) => {
  const { text, captcha, _id } = req.body
  try {
    if (!_id) {
      const newCaptcha = await captchaDB.create({ text, name: captcha })
      sendData(null, newCaptcha, res)
    }
    if (!captcha) {
      res.send({
        msg: '内容不能为空',
      })
      return
    }
    const editCaptcha = await captchaDB.findOneAndUpdate({ _id: _id }, { captcha: captcha, text: text }, { new: true })
    sendData(null, editCaptcha, res)
  } catch (error) {
    console.log(error)
  }
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
  captchaDB
    .find({})
    .sort({ time: -1 })
    .exec((err, data) => {
      sendData(err, data, res)
    })
})

module.exports = router
