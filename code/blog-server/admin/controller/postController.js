const { postDB } = require('../../models/post')
const { ObjectId } = require('mongodb')
exports.post_list = async (req, res, next) => {
  try {
    const data = await postDB.find()
    res.json({
      data,
    })
  } catch (error) {
    next(error)
  }
}

exports.post_audit = async (req, res, next) => {
  try {
    const { id, title, body, captcha_id, publicShow } = req.body
    const data = await postDB.findOneAndUpdate({ _id: ObjectId(id) }, { publicShow: publicShow })
    res.json({ data })
  } catch (error) {
    next(error)
  }
}
exports.post_audit1 = async (req, res, next) => {
  try {
  } catch (error) {
    next(error)
  }
}
