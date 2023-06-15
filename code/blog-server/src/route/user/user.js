const { Router } = require('express')
const router = Router()
const user = require('../../controller/user')

router.post('/login',user.login)
router.post('/regsiter', user.regsiter)

module.exports = router