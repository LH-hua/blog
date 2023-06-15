const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/secret.config')

const salt = bcrypt.genSaltSync(10)

const user = {
  login: async (req, res, next) => {
    try {
      let result = await User.findOne({ username: req.body.username })
      if (!result) {
        res.send({
          type: 'info',
          msg: '用户名不存在'
        })
        return
      }
      const isTure = bcrypt.compareSync(req.body.password, result.password)
      if (!isTure) {
        res.send({
          type: 'error',
          msg: '密码错误'
        })
        return
      }
      const token = jwt.sign(toString(result._id), secret)
      res.send({
        type: 'success',
        msg: '登录成功',
        token: token,
        data: result
      })
    } catch (error) {
      next(error)
    }
  },
  regsiter: async (req, res, next) => {
    try {
      const result = await User.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, salt)
      })
      if (result) {
        res.status(200).send(result)
      }
    } catch (error) {
      res.status(404).send({
        msg: '注册失败',
        error: error
      })
      next(error)
    }
  }
}
module.exports = user