const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const multiparty = require('multiparty')
const { Router } = require('express')
const { ObjectId } = require('mongodb')

const router = Router()
// const user = require('../controller/user')
const { User, userPost } = require('../../models/user')

const { generateToken } = require('../../tool')
const { postDB } = require('../../models/post')

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
      res.status(200).send({
        msg: '注册成功！',
      })
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
  // const data = await User.aggregate([
  //   {
  //     $match: { _id: ObjectId(u_id) },
  //   },
  //   {
  //     $lookup: {
  //       from: 'userposts',
  //       localField: '_id',
  //       foreignField: 'u_id',
  //       as: 'postTotal',
  //     },
  //   },
  //   {
  //     $unwind: '$postTotal',
  //   },
  //   {
  //     $project: {
  //       password: 0,
  //       email: 0,
  //       phone: 0,
  //       admin: 0,
  //       name: 0,
  //       _id: 0,
  //       'postTotal._id': 0,
  //     },
  //   },
  //   {
  //     $group: { _id: '$username', totalQuantity: { $sum: '$postTotal.p_id' } },
  //   },
  // ])
  const data = await User.findOne(
    { _id: ObjectId(u_id) },
    {
      password: 0,
      email: 0,
      phone: 0,
      admin: 0,
      name: 0,
      _id: 0,
    }
  )
  const postSum = await userPost.findOne({ u_id: ObjectId(u_id) })
  res.send({
    data,
    post_total: postSum.p_id.length,
  })
})

module.exports = router
