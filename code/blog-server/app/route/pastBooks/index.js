/**
 * @swagger
 *  tags:
 *      - name: pastBooks
 *        description: 往昔册
 */
const { Router } = require('express')
const router = Router()

const { pastBookDB } = require('../../models/pastBooks')

/**
 * @swagger
 * /api/pastBooks/list:
 *  get:
 *      summary: 列表
 *      tags: [pastBooks]
 *      parameters:
 *        - name: title
 *          in: query
 *          description: 需求内容
 *      responses:
 *          200:
 *             description: 成功
 *
 */
router.get('/list', async (req, res, next) => {
  try {
    const { title } = req.query
    const reg = new RegExp(title, 'gi')
    const data = await pastBookDB.aggregate([
      {
        $match: {
          title: reg,
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
 * /api/pastBooks/create:
 *  post:
 *      summary: 添加往昔
 *      tags: [pastBooks]
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
 *                  description: '标题'
 *                body:
 *                  type: string
 *                  description: '内容'
 *                cover:
 *                  type: string
 *                  description: '封面'
 *      responses:
 *          200:
 *             description: 成功
 *
 */
router.post('/create', async (req, res, next) => {
  try {
    const { title, body, cover } = req.body
    if (!title || !body) return res.json({ msg: '数据不完整！' })
    const data = await pastBookDB.create({ title, body, cover })
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
