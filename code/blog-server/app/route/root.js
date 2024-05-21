const { Router } = require('express')
const rootDB = require('../models/root')
const { postDB, captchaDB } = require('../models/post')
const sendData = require('../utils/dataFun')
const router = Router()
/**
 * @swagger
 * /api/user/find:
 *  get:
 *      summary: 获取站长信息
 *      tags: [Sys]
 *      responses:
 *          200:
 *             description: 成功
 *
 */
router.get('/find', async (req, res, next) => {
  const postCount = await postDB.find().count()
  const captchaCount = await captchaDB.find().count()
  await rootDB.findOneAndUpdate(
    { name: 'lh-hua' },
    { post: postCount, tags: captchaCount },
    {
      upsert: true,
      returnOriginal: false, // 返回更新后的文档，默认为true，返回更新前的文档
    }
  )
  rootDB.findOne({}, (err, data) => {
    sendData(err, data, res)
  })
})
module.exports = router
