const bcrypt = require('bcryptjs')
const { adminDB } = require('../../models/admin')
const sgin = require('../../sign')

exports.admin_login = async (req, res, next) => {
  const { name, password } = req.body
  const user = await adminDB.findOne({ name })
  if (!user) {
    return res.status(404).json({ msg: '用户名不存在' })
  }
  try {
    const flag = await bcrypt.compare(password, user.password)
    if (flag) {
      const token = sgin.admin_sign({ id: user._id, admin: true })
      res.json({ code: 200, token: token, msg: '登录成功' })
    } else {
      res.json({
        code: 404,
        msg: '密码错误',
      })
    }
  } catch (error) {
    next(error)
  }
}

exports.admin_list = async (req, res, next) => {
  try {
    const data = await adminDB.find()
    res.json({
      data,
    })
  } catch (error) {
    next(error)
  }
}
