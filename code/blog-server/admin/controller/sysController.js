const { ObjectId } = require('mongodb')
const { Menu } = require('../../models/sys')
/**
 * @swagger
 * /api/admin/sys/menus/list:
 *  get:
 *      summary: 导航栏查询
 *      tags: [系统]
 *      responses:
 *          200:
 *             description: 成功
 *
 */
exports.menu_list = async (req, res, next) => {
  try {
    const data = await Menu.find()
    res.json({
      data,
    })
  } catch (error) {
    next(error)
  }
}
/**
 * @swagger
 * /api/admin/sys/menus/root/add:
 *  post:
 *      summary: 增加根目录导航
 *      tags: [系统]
 *      requestBody:
 *        description: "Update post object"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: '名称'
 *                password:
 *      responses:
 *          200:
 *             description: 成功
 *
 */
exports.menu_add = async (req, res, next) => {
  try {
    const { name } = req.body
    const data = await Menu.create({ name: name })
    res.json({
      data,
    })
  } catch (error) {
    next(error)
  }
}
/**
 * @swagger
 * /api/admin/sys/menus/update:
 *  post:
 *      summary: 修改导航栏信息
 *      tags: [系统]
 *      requestBody:
 *        description: "Update post object"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                  description: 'id'
 *                name:
 *                  type: string
 *                  description: '名称'
 *                show:
 *                  type: boolean
 *                  description: '是否显示'
 *                meta:
 *                  type: object
 *                  description: '元数据'
 *                  properties:
 *                    keywords:
 *                      type: string
 *                      description: '关键词'
 *                    description:
 *                      type: string
 *                      description: '描述'
 *                    isLogin:
 *                      type: boolean
 *                      description: '是否需要登录'
 *      responses:
 *          200:
 *             description: 成功
 *
 */
exports.menu_update = async (req, res, next) => {
  try {
    const { name, _id, show, meta, url, path } = req.body
    if (!_id) {
      res.send({
        msg: 'id不能为空',
      })
      return
    }
    const data = await Menu.findOneAndUpdate(
      { _id: ObjectId(_id) },
      { name, show, url, path, 'meta.keywords': meta.keywords, 'meta.description': meta.description, 'meta.isLogin': meta.isLogin },
      { new: true }
    )
    res.json({
      data,
      status: 200,
    })
  } catch (error) {
    next(error)
  }
}
