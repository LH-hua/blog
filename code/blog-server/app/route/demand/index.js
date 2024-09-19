/**
 * @swagger
 *  tags:
 *      - name: demand
 *        description: 需求墙
 */
const { Router } = require('express')
const router = Router()

const { demandDB } = require('../../models/demand')

/**
 * @swagger
 * /api/demand/list:
 *  get:
 *      summary: 列表
 *      tags: [demand]
 *      parameters:
 *        - name: text
 *          in: query
 *          description: 需求内容
 *      responses:
 *          200:
 *             description: 成功
 *
 */
router.get('/list', async (req, res, next) => {
  try {
    // await demandDB.insertMany([
    //   {
    //     text: '表白墙',
    //     u_id: Object('66e675b4b7366d27c5a61292'),
    //   },
    //   {
    //     text: '雨天',
    //     u_id: Object('66e8307cbf3029b3998dad41'),
    //   },
    //   {
    //     text: '简历模板',
    //     u_id: Object('66e8423ad3ecf3e9d9f6740b'),
    //   },
    //   {
    //     text: '测试数据',
    //     u_id: Object('66e675b4b7366d27c5a61292'),
    //   },
    // ])
    const { text } = req.query
    const reg = new RegExp(text, 'i')
    const data = await demandDB.aggregate([
      {
        $match: {
          text: reg,
        },
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
          captcha_id: 0,
          body: 0,
          'auther.password': 0,
          'auther.email': 0,
          'auther.phone': 0,
          'auther.admin': 0,
          'auther.name': 0,
        },
      },
    ])

    res.json({
      msg: 'ok',
      status: 200,
      data,
    })
  } catch (error) {
    next(error)
  }
})

/**
 * @swagger
 * /api/demand/create:
 *  post:
 *      summary: 添加需求
 *      tags: [demand]
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
 *                text:
 *                  type: string
 *                  description: '内容'
 *                u_id:
 *                  type: string
 *                  description: '用户id'
 *      responses:
 *          200:
 *             description: 成功
 *
 */
router.post('/create', async (req, res, next) => {
  try {
    const { text, u_id } = req.body
    const data = await demandDB.create({ text, u_id: Object(u_id) })
    res.json({
      msg: 'ok',
      status: 200,
      data,
    })
  } catch (error) {
    next(error)
  }
})
module.exports = router
