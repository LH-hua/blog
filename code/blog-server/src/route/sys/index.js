const { Router } = require('express')
const router = Router()

router.use('/token', require('./sys'))

module.exports = router