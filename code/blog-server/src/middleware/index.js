const jwt = require('jsonwebtoken')
const { secret } = require('../config/secret.config')

const middel = {
  authorization: (req, res, next) => {
    if (req.headers.authorization) {
      const result = jwt.verify(req.headers.authorization,secret)
      // console.log(result)
      req.body.userId = result.id
      next()
    } else {
      res.send({
        msg:'authorization 未定义,无权发布数据',
        status:200
      })
      return
    }
  },
  authorizationTureAndFalse: (req, res, next) => {
    try {
      
    } catch (error) {

    }
  }
}

module.exports = middel