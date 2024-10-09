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
