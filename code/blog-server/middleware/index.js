const jwt = require('jsonwebtoken')
const { resloveToken } = require('../tool')

// 验证token
const authenticateToken = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.send({
        msg: 'authorization 未定义',
        status: 200,
      })
      return
    }
    const result = resloveToken(req.headers.authorization)
    if (!result) {
      res.send({
        msg: 'authorization 无效',
        status: 200,
      })
      return
    }
    if (result.admin) {
      req.body.admin = result.admin
    }
    req.body.u_id = result.id
    req.query.u_id = result.id
    next()
  } catch (error) {
    next(error)
  }
}
module.exports = {
  authenticateToken,
}
