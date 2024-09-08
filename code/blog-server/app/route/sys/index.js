const { Router, query } = require('express')
const router = Router()
const { sysDb } = require('../../models/sys')
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
module.exports = router
