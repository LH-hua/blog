const { Router } = require('express')
const router = Router()

router.use('/token', require('./sys'))
router.use('/code', require('./captcha'))

module.exports = router