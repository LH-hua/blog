const bcrypt = require('bcryptjs')
const { adminDB } = require('../../models/admin')
const sgin = require('../../sign')

/**
 * @swagger
 * /api/admin/login:
 *  post:
 *      summary: 管理员登录
 *      tags: [管理员]
 *      requestBody:
 *        description: "Update post object"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: '账号'
 *                password:
 *                  type: string
 *                  description: '密码'
 *      responses:
 *          200:
 *             description: 成功
 *
 */
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
/**
 * @swagger
 * /api/admin/regsiter:
 *  post:
 *      summary: 添加管理员
 *      tags: [管理员]
 *      requestBody:
 *        description: "Update post object"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: '账号'
 *                password:
 *                  type: string
 *                  description: '密码'
 *                avatar:
 *                  type: string
 *                  description: '头像'
 *                phone:
 *                  type: number
 *                  description: '电话'
 *                role:
 *                  type: string
 *                  description: '角色'
 *                roles:
 *                  type: array
 *                  items:
 *                    type: string
 *                  description: '菜单权限'
 *      responses:
 *          200:
 *             description: 成功
 *
 */
exports.admin_register = async (req, res, next) => {
  try {
    const { name, password, avatar, phone, role, roles } = req.body

    // 检查用户名是否已存在
    const existingUser = await adminDB.findOne({ name: name })
    if (existingUser) {
      return res.status(400).json({ error: '用户名已存在' })
    }

    // 对密码进行哈希处理
    const hashedPassword = await bcrypt.hash(password, 10)

    // 创建新用户
    await adminDB.insertMany([{ name, avatar, phone, role, roles, password: hashedPassword }])
    res.status(200).json({ message: '注册成功' })
  } catch (error) {
    res.status(500).json({ error: '注册失败' })
  }
}

/**
 * @swagger
 * /api/admin/list:
 *  get:
 *      summary: 管理员列表查询
 *      tags: [管理员]
 *      responses:
 *          200:
 *             description: 成功
 *
 */
exports.admin_list = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const info = resloveToken(token)
    if (info) {
      const adminData = await adminDB.find({}, { password: 0 })
      if (adminData) {
        res.json({
          msg: 'ok',
          data: adminData,
        })
      }
    }
  } catch (error) {
    next(error)
  }
}
/**
 * @swagger
 * /api/admin/update:
 *  post:
 *      summary: 编辑管理员
 *      tags: [管理员]
 *      requestBody:
 *        description: "Update post object"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  description: '管理员ID'
 *                name:
 *                  type: string
 *                  description: '账号'
 *                password:
 *                  type: string
 *                  description: '密码'
 *                avatar:
 *                  type: string
 *                  description: '头像'
 *                phone:
 *                  type: number
 *                  description: '电话'
 *                role:
 *                  type: string
 *                  description: '角色'
 *      responses:
 *          200:
 *             description: 成功
 *
 */
exports.admin_update = async (req, res, next) => {
  try {
    const { _id } = req.body
    if (!_id) {
      res.json({
        msg: 'id不能为空',
      })
    }
    const update = req.body
    delete update._id

    if (update.password) {
      update.password = await bcrypt.hash(password, 10)
    }
    if (update.role) {
      update.role = ObjectId(update.role)
    }
    const updateData = await adminDB.findByIdAndUpdate({ _id: ObjectId(_id) }, update)
    if (updateData) {
      res.json({
        msg: 'ok',
      })
    }
  } catch (error) {
    next(error)
  }
}
exports.admin_list1 = async (req, res, next) => {
  try {
    const data = await adminDB.find()
    res.json({
      data,
    })
  } catch (error) {
    next(error)
  }
}
