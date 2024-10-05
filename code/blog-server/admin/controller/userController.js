const { User } = require('../../models/user')
exports.user_list = async (req, res, next) => {
  try {
    const data = await User.find()
    res.json({
      data,
    })
  } catch (error) {
    next(error)
  }
}
