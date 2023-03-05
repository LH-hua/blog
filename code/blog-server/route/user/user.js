const { Router } = require('express')
const router = Router()

const user = require('../../Controller/user')

router.post('/login',user.login)
router.post('/regsiter',user.regsiter)

module.exports = router