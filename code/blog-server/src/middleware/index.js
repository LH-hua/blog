const middel = {
  authorization: (req, res, next) => {
    if (req.headers.authorization) {
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