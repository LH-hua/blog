const { Router } = require('express')
const prejectDB = require('../../../models/preject')
const sendData = require('../../utils/dataFun')
const router = Router()

/**
 * @swagger
 * tags:
 *  - name: Preject
 *    description: 项目
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
 * /api/preject/list:
 *  get:
 *      summary: 项目列表
 *      tags: [Preject]
 *      parameters: []
 *      responses:
 *          200:
 *             description: 成功
 *
 */
router.get('/list', (req, res, next) => {
  console.log(req.query)
  prejectDB.find({}, (err, data) => {
    sendData(err, data, res)
  })
})

/**
 * @swagger
 * /api/preject/create:
 *  post:
 *      summary: 新增项目列表
 *      tags: [Preject]
 *      security:
 *        - basicAuth: []
 *      requestBody:
 *        description: "Created post object"
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: 项目标题
 *               subtitle:
 *                 type: string
 *                 description: 子标题
 *               cover:
 *                 type: string
 *                 description: 图片地址
 *      responses:
 *          200:
 *             description: 成功
 *
 */
router.post('/create', (req, res, next) => {
  console.log(req.body)
  prejectDB.insertMany(req.body, (err, data) => {
    sendData(err, data, res)
  })
})
module.exports = router
