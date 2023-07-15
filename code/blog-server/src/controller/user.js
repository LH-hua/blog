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
      // [0] {
      //   [0]   _id: new ObjectId("648d58fc3d70254b2985667c"),
      //   [0]   name: null,
      //   [0]   username: 'admin',
      //   [0]   password: '$2a$10$G6JXcsTVo.8eEXYdjbXXL.z1B/cMJDIZstWluKY0D7esc0HZRRUca',
      //   [0]   avatar: null,
      //   [0]   email: null,
      //   [0]   phone: null,
      //   [0]   __v: 0
      //   [0] }
      console.log(result)
      const token = jwt.sign({ id: result._id,username:result.username,password:result.password }, secret)
      res.send({
        type: 'success',
        msg: '登录成功',
        token: token,
        status: 200,
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
      const form = new multiparty.Form({ autoFiles: true, uploadDir: process.platform == 'win32' ? `${__dirname}../../../assets/image` : '/var/local/media/nodeAssets/image' })
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
        res.send({ src: `/image/${fileArr[fileArr.length - 1]}` })
      })
    } catch (error) {
      res.send({
        msg: "error:" + error
      })
      next(err)
    }
  },
  userInfo: async (req,res) => {
    const {id} = req.query
    console.log(id)
  }
}
module.exports = user