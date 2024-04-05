const { Router } = require('express')
const rootDB = require('../models/root')
const sendData = require('../utils/dataFun')
const router = Router()
/**
 * @swagger
 * /api/user/find:
 *  get:
 *      summary: 获取站长信息
 *      tags: []
 *      responses:
 *          200:
 *             description: 成功
 *
 */
router.get('/find', (req, res, next) => {
  rootDB.findOne({}, (err, data) => {
    sendData(err, data, res)
  })
})
module.exports = router
