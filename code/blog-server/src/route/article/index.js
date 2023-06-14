const { Router } = require('express')
const router = Router()

router.use('/article',require('./article'))

module.exports = router