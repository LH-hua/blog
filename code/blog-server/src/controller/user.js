const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const multiparty = require('multiparty')
const { secret } = require('../config/secret.config')

const salt = bcrypt.genSaltSync(10)

const user = {
  login: async (req, res, next) => {
    console.log(req.body)
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
      // next(error)
    }
  },
  upImage: async (req, res, next) => {
    try {
      const form = new multiparty.Form({ autoFiles: true, uploadDir: `${__dirname}../../../assets/image` })
      form.parse(req, (err, fields, files) => {
        if (err) {
          res.send({
            msg: '文件错误:' + err
          })
          next(err)
          return
        }
      })
      form.on('file', (name, file) => {
        let fileArr
        if (process.platform === 'win32') {
          fileArr = file.path.split('\\')
        } else {
          fileArr = file.path.split('/');
        }
        res.send({ src: `image/${fileArr[fileArr.length - 1]}` })
      })
    } catch (error) {
      res.send({
        msg: "error:" + error
      })
      next(err)
    }
  }
}
module.exports = user