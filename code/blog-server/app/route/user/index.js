const { Router } = require('express')
const router = Router()

router.use('/post', require('./user'))

module.exports = router
