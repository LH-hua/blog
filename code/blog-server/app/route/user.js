const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const multiparty = require('multiparty')
const { secret } = require('../config/secret.config')
const { Router } = require('express')
const router = Router()
// const user = require('../controller/user')
const User = require('../models/user')

const salt = bcrypt.genSaltSync(10)

/**
 * @swagger
 *  tags:
 *      - name: User
 *        description: 用户
 *
 * components:
 *  schemas:
 *      User:
 *        type: object
 *        properties:
 *          username:
 *             type: string
 *          password:
 *             type: string
 */

/**
 * @swagger
 * /api/user/login:
 *  post:
 *      summary: 登录
 *      description: "登录用户信息"
 *      tags: [User]
 *      requestBody:
 *        description: "Created user object"
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *             description: 成功
 */

router.post('/login', async (req, res, next) => {
  console.log(req.body)
  console.log(User)
  try {
    let result = await User.findOne({ username: req.body.username })
    if (!result) {
      res.send({
        type: 'info',
        msg: '用户名不存在',
      })
      return
    }
    const isTure = bcrypt.compareSync(req.body.password, result.password)
    if (!isTure) {
      res.send({
        type: 'error',
        msg: '密码错误',
      })
      return
    }
    console.log(result)
    const token = jwt.sign({ id: result._id, username: result.username, password: result.password }, secret)
    res.send({
      type: 'success',
      msg: '登录成功',
      token: token,
      status: 200,
      data: result,
    })
  } catch (error) {
    next(error)
  }
})

/**
 * @swagger
 * /api/user/regsiter:
 *   post:
 *     summary: 注册
 *     description: 注册用户信息
 *     tags: [User]
 *     requestBody:
 *       description: 创建用户对象
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: 成功
 */

router.post('/regsiter', async (req, res, next) => {
  console.log(req.body)
  try {
    const result = await User.create({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, salt),
    })
    if (result) {
      res.status(200).send(result)
    }
  } catch (error) {
    console.log(error)
    res.send({
      msg: '注册失败',
      error: error,
    })
    // next(error)
  }
})
router.post('/upload-image', async (req, res, next) => {
  try {
    const form = new multiparty.Form({
      autoFiles: true,
      uploadDir: process.platform == 'win32' ? `${__dirname}../../../assets/image` : '/var/local/media/nodeAssets/image',
    })
    form.parse(req, (err, fields, files) => {
      if (err) {
        res.send({
          msg: '文件错误:' + err,
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
        fileArr = file.path.split('/')
      }
      res.send({ src: `/image/${fileArr[fileArr.length - 1]}` })
    })
  } catch (error) {
    res.send({
      msg: 'error:' + error,
    })
    next(err)
  }
})
router.get('/user-info', async (req, res) => {
  const { id } = req.query
  console.log(id)
})

module.exports = router
