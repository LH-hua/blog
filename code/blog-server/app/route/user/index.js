const bcrypt = require('bcryptjs')
const multiparty = require('multiparty')
const { Router } = require('express')
const { ObjectId } = require('mongodb')
const svgCaptcha = require('svg-captcha')
const fs = require('fs')
const path = require('path')
const router = Router()
const { User } = require('../../../models/user')
const { postDB } = require('../../../models/post')
const createRedisClient = require('../../../redis')
const { generateToken, emailVerify, maskEmailLocalPart } = require('../../tool')
const { avatarPath } = require('../../config')

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
        msg: '用户名不存在',
        status: 201,
      })
      return
    }
    const isTure = bcrypt.compareSync(req.body.password, result.password)
    if (!isTure) {
      res.send({
        msg: '密码错误',
        status: 202,
      })
      return
    }
    const token = generateToken({ id: result._id })
    res.send({
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
    const name = await User.findOne({ username: username })
    if (name) {
      res.send({
        status: 202,
        msg: '用户已存在',
      })
      return
    }
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
        res.send({
          status: 201,
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
  try {
    const { u_id } = req.query
    // const data = await userPost.findByIdAndUpdate({ _id: ObjectId(u_id) }, { u_id: ObjectId(u_id) }, { upsert: true, new: true })
    const total = await postDB.countDocuments({ u_id: ObjectId(u_id) })

    const data = await User.aggregate([
      {
        $match: { _id: ObjectId(u_id) },
      },
      // {
      //   $lookup: {
      //     from: 'posts',
      //     localField: '_id',
      //     foreignField: 'u_id',
      //     as: 'pastbooks',
      //   },
      // },
      // {
      //   $lookup: {
      //     from: 'demands',
      //     localField: '_id',
      //     foreignField: 'u_id',
      //     as: 'demands',
      //   },
      // },
      {
        $project: {
          password: 0,
          phone: 0,
          admin: 0,
          name: 0,
        },
      },
    ])
    res.send({
      data: { ...data[0], postTotal: total },
    })
  } catch (error) {
    next(error)
  }
})
/**
 * @swagger
 * /api/user/update:
 *   post:
 *     summary: 更新用户信息
 *     description: 用户信息
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
 *                text:
 *                  type: string
 *                  description: '签名'
 *                email:
 *                  type: string
 *                  description: '邮箱'
 *                avatar:
 *                  type: string
 *                  description: '头像'
 *                sex:
 *                  type: string
 *                  description: '性别'
 *     responses:
 *       '200':
 *         description: 成功
 */

router.post('/update', async (req, res, next) => {
  try {
    const { sex, username, text, avatar, _id } = req.body
    const existingUser = await User.findOne({ username: username })
    const update = { sex, avatar, text }
    if (!existingUser) {
      update.username = username
    }
    console.log(update)
    const data = await User.findOneAndUpdate({ _id: ObjectId(_id) }, update, { upsert: true, new: true })

    res.send({ data })
  } catch (error) {
    next(error)
  }
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
/**
 * @swagger
 * /api/user/upload-avatar:
 *   post:
 *     summary: 上传头像
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *               id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: 成功上传图片
 */
router.post('/upload-avatar', async (req, res, next) => {
  try {
    const form = new multiparty.Form()
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({ message: '解析失败', error: err })
      }
      const userId = fields.id ? fields.id[0] : null // 取出第一个值
      const avatarFile = files.avatar ? files.avatar[0] : null // 取出第一个文件

      if (!userId || !avatarFile) {
        return res.status(400).json({ message: '缺少用户 ID 或头像文件' })
      }
      const tempPath = avatarFile.path
      const newFileName = `${userId}-${avatarFile.originalFilename}` // 新文件名
      const savePath = path.join(avatarPath, newFileName) // 保存路径

      // 确保目标目录存在
      if (!fs.existsSync(avatarPath)) {
        fs.mkdirSync(avatarPath, { recursive: true })
      }
      // 使用 copyFile 和 unlink 来替代 rename
      fs.copyFile(tempPath, savePath, (copyErr) => {
        if (copyErr) {
          return res.status(500).json({ message: '文件保存失败', error: copyErr })
        }

        // 复制成功后，删除临时文件
        fs.unlink(tempPath, async (unlinkErr) => {
          if (unlinkErr) {
            return res.status(500).json({ message: '临时文件删除失败', error: unlinkErr })
          }
          await User.findOneAndUpdate({ _id: ObjectId(userId) }, { avatar: `/avatar/${newFileName}` })
          res.status(200).json({ message: '上传成功', url: `/avatar/${newFileName}`, avatarPath: savePath })
        })
      })
      // fs.rename(tempPath, savePath, (renameErr) => {
      //   if (renameErr) {
      //     return res.status(500).json({ message: '文件保存失败', error: renameErr })
      //   }
      //   res.status(200).json({ message: '上传成功', userId, avatarPath: savePath })
      // })
    })
  } catch (error) {
    next(err)
  }
})

/**
 * @swagger
 * /api/user/updateEmail:
 *   post:
 *     summary: 更新邮箱
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       '200':
 *         description: ok
 */
router.post('/updateEmail', async (req, res, next) => {
  try {
    const { code, email, u_id } = req.body
    if (!code || !email) {
      res.json({
        msg: '信息不完整',
        status: 404,
      })
    }
    redis.get(email, async function (err, value) {
      if (err) {
        res.json({
          msg: '验证码错误',
          status: 404,
        })
        return
      }
      if (value == code) {
        const data = await User.findOneAndUpdate({ _id: ObjectId(u_id) }, { email: email }, { new: true })
        res.json({
          data,
          msg: '更新成功',
        })
        return
      }
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
