const { Router } = require('express')
const router = Router()

router.use('/list', require('./article'))

module.exports = router
