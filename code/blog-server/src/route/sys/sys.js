const { Router } = require('express')
const router = Router()
const sys = require('../../controller/sys')

router.post('/menuAndRouter', (req, res, next) => {
  const { token } = req.headers
  if (!token) {
    res.send({
      msg: '请求头 token 未定义'
    })
    return
  }
  next()
}, sys.currentMenu)

router.post('/addMenu', (req, res, next) => {
  // 判断数据是否正确
  next()
},sys.addMenu)

module.exports = router