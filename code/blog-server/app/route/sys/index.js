const { Router, query } = require('express')
const { ObjectId } = require('mongodb')
const router = Router()
const { sysDb, about_DB } = require('../../models/sys')
const sendData = require('../../utils/dataFun')
/**
 * @swagger
 * tags:
 *  - name: Sys
 *    description: 系统
 */

/**
 * @swagger
 * /api/sys/announcement:
 *  get:
 *      summary: 获取公告
 *      tags: [Sys]
 *      parameters: []
 *      responses:
 *          200:
 *             description: 成功
 *
 */
router.get('/announcement', (req, res, next) => {
  sysDb.findOne({}, (err, data) => {
    sendData(err, data, res)
  })
})

/**
 * @swagger
 * /api/sys/announcement-editor:
 *  get:
 *      summary: 公告修改
 *      tags: [Sys]
 *      parameters:
 *          - name: text
 *            in: query
 *            description: '公告内容'
 *      responses:
 *          200:
 *             description: 成功
 *
 */
router.get('/announcement-editor', (req, res, next) => {
  const { text } = req.query
  sysDb.findOneAndUpdate({}, { announcement: text }, { new: true, upsert: true }, (err, data) => {
    console.log(data)
    sendData(err, data, res)
  })
})

/**
 * @swagger
 * /api/sys/about:
 *  get:
 *      summary: 网站说明
 *      tags: [Sys]
 *      parameters: []
 *      responses:
 *          200:
 *             description: 成功
 *
 */
router.get('/about', async (req, res, next) => {
  const data = await about_DB.findOne()
  if (data) {
    res.json({
      data,
    })
  }
})
/**
 * @swagger
 * /api/sys/about/update:
 *  post:
 *      summary: 网站说明
 *      tags: [Sys]
 *      requestBody:
 *        description: "Created user object"
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  description: 'id'
 *                text:
 *                  type: string
 *                  description: '说明'
 *      responses:
 *          200:
 *             description: 成功
 *
 */
router.post('/about/update', async (req, res, next) => {
  try {
    const { id, text } = req.body
    if (!id) {
      res.json({
        msg: 'id不能为空',
      })
      return
    }
    const data = await about_DB.findOneAndUpdate({ _id: ObjectId(id) }, { text }, { upsert: true, new: true })
    if (data) {
      res.json({
        data,
        msg: 'ok',
      })
    }
  } catch (error) {
    next(error)
  }
})
module.exports = router
