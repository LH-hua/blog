const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const multiparty = require('multiparty')
const { Router } = require('express')
const { ObjectId } = require('mongodb')
const svgCaptcha = require('svg-captcha')
// const redis = require('redis')
const router = Router()
// const user = require('../controller/user')
const { User, userPost } = require('../../models/user')
// const { redis } = require('../../../app.js')
const createRedisClient = require('../../redis')

const { generateToken, emailVerify, maskEmailLocalPart } = require('../../tool')

const salt = bcrypt.genSaltSync(10)
const redis = createRedisClient()

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
    const token = generateToken({ id: result._id })
    res.send({
      type: 'success',
      msg: '登录成功',
      token: token,
      status: 200,
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
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  description: '用户名'
 *                password:
 *                  type: string
 *                  description: '密码'
 *                email:
 *                  type: string
 *                  description: '邮箱'
 *                code:
 *                  type: string
 *                  description: '验证码'
 *     responses:
 *       '200':
 *         description: 成功
 */

router.post('/regsiter', async (req, res, next) => {
  try {
    const { username, userpassword, email, code } = req.body
    redis.get(email, async function (err, value) {
      if (err) throw err
      console.log(value)
      if (value == code) {
        const result = await User.create({
          username: username,
          password: bcrypt.hashSync(userpassword, salt),
          email: email,
        })
        if (result) {
          res.status(200).send({
            msg: '注册成功！',
            status: 200,
          })
        }
      } else {
        res.status(200).send({
          msg: '验证码不正确',
        })
      }
    })
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

/**
 * @swagger
 * /api/user/info:
 *  get:
 *      summary: 查询用户信息
 *      tags: [User]
 *      parameters:
 *        - name: u_id
 *          in: query
 *          description: 用户id
 *      responses:
 *          200:
 *             description: 成功
 *
 */
router.get('/info', async (req, res) => {
  const { u_id } = req.query
  // const data = await userPost.findByIdAndUpdate({ _id: ObjectId(u_id) }, { u_id: ObjectId(u_id) }, { upsert: true, new: true })
  const data = await User.aggregate([
    {
      $match: { _id: ObjectId(u_id) },
    },
    {
      $lookup: {
        from: 'pastbooks',
        localField: '_id',
        foreignField: 'u_id',
        as: 'pastbooks',
      },
    },
    {
      $lookup: {
        from: 'demands',
        localField: '_id',
        foreignField: 'u_id',
        as: 'demands',
      },
    },
    {
      $project: {
        password: 0,
        email: 0,
        phone: 0,
        admin: 0,
        name: 0,
      },
    },
  ])
  res.send({
    data: data[0],
  })
})
/**
 * @swagger
 * /api/user/emailVerify:
 *  get:
 *      summary: 发送邮箱验证码
 *      tags: [User]
 *      parameters:
 *        - name: email
 *          in: query
 *          description: 邮箱
 *      responses:
 *          200:
 *             description: 成功
 *
 */
router.get('/emailVerify', async (req, res, next) => {
  const { email } = req.query
  let code = svgCaptcha.create({ size: 6 }).text
  const text = `<b>[lhgo]</b><br><p>您正在注册lhgo<br/></p><p>您的验证码：${code}<br/>不要告诉别人哦！</p><br/><p>验证码15分钟内有效</p>`
  const result = await emailVerify(email, text)
  if (result.response) {
    redis.set(email, code, 'EX', 900)
    res.send({
      msg: '验证码已发送，注意查收！',
      status: '200',
    })
  }
})
/**
 * @swagger
 * /api/user/verifyInfo:
 *  get:
 *      summary: 验证用户信息
 *      tags: [User]
 *      parameters:
 *        - name: email
 *          in: query
 *          description: 邮箱
 *      responses:
 *          200:
 *             description: 成功
 *
 */
router.get('/verifyInfo', async (req, res, next) => {
  const { email } = req.query
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  let userInfo
  if (pattern.test(email)) {
    userInfo = await User.findOne({ email: email })
  } else {
    userInfo = await User.findOne({ username: email })
  }
  if (userInfo) {
    let code = svgCaptcha.create({ size: 6 }).text
    const text = `<b>[lhgo]</b><br><p>您正在进行重置密码操作<br/><p>您的验证码：${code}<br/>不要告诉别人哦！</p><br/><p>验证码15分钟内有效</p>`
    const result = await emailVerify(email, text)
    if (result.response) {
      // const client = redis.createClient(6379, '127.0.0.1')
      // client.on('error', function (err) {
      //   console.log('Error ' + err)
      // })
      redis.set(email, code, 'EX', 900)
      // client.quit()
      return res.send({
        msg: `验证码已发送至${maskEmailLocalPart(userInfo.email, 5)}，注意查收！`,
        status: '200',
      })
    }
  }
  res.send({
    msg: '不存在该用户',
  })
})

router.get('/verifyCode', async (req, res, next) => {
  const { code } = req.query
  const value = redis.get('')
})

module.exports = router
