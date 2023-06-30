const { Router } = require('express')
const router = Router()
const sys = require('../../controller/sys/sys.js')

router.get('/Captcha', (req, res, next) => {
  next()
}, sys.captcha)

module.exports = router