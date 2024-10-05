const { captchaDB } = require('../../models/post')
const { ObjectId } = require('mongodb')
exports.captcha_update = async (req, res, next) => {
  try {
    const { id, name, text } = req.body
    const data = await captchaDB.findOneAndUpdate({ id: ObjectId(id) }, { name, text })
    res.json({
      data,
    })
  } catch (error) {
    next(error)
  }
}
