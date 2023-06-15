module.exports = sys = {
  currentMenu: (req, res, next) => {
    try {
      const { token } = req.headers
      // 判断token是否正确
      // 。。。
      res.send({
        msg:'还没开发好呢'
      })

      // 正确返回菜单
    } catch (error) {

    }
  }
}