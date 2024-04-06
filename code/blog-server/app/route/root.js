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
 *      tags: []
 *      responses:
 *          200:
 *             description: 成功
 *
 */
router.get('/find', async (req, res, next) => {
  const postCount = await postDB.find().count()
  const captchaCount = await captchaDB.find().count()
  await rootDB.findOneAndUpdate({ name: 'lh-hua' }, { post: postCount, tags: captchaCount })
  rootDB.findOne({}, (err, data) => {
    sendData(err, data, res)
  })
})
module.exports = router
