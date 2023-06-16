const menu = require('../models/sys')
module.exports = sys = {
  currentMenu: async (req, res, next) => {
    try {
      const { token } = req.headers
      // 判断token是否正确
      // 。。。
      const result = await menu.find({})
      res.send({
        msg: 'ok',
        data: result
      })

      // 正确返回菜单
    } catch (error) {

    }
  },
  addMenu: async (req, res, next) => {
    try {
      const { token } = req.headers
      if (token == undefined) {
        res.send({
          msg:'未定义 token 值'
        })
        return
      }
      const data = req.body
      const result = await menu.create(data)
      if (result) {
        res.send({
          msg: '添加成功',
          data:result
        })
      }
    } catch (error) {

    }
  }
}