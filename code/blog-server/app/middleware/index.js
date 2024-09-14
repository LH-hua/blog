const jwt = require('jsonwebtoken')
const { resloveToken } = require('../tool')

// 验证token
const authenticateToken = (req, res, next) => {
  if (!req.headers.authorization) {
    res.send({
      msg: 'authorization 未定义',
      status: 200,
    })
  }
  const result = resloveToken(req.headers.authorization)
  if (!result) {
    res.send({
      msg: 'authorization 无效',
      status: 200,
    })
  }
  req.body.u_id = result.id
  next()
}
module.exports = {
  authenticateToken,
}
