const { Router } = require('express')
const router = Router()
const user = require('../../controller/user')

router.post('/login', user.login)
router.post('/regsiter', user.regsiter)
router.post('/upload-image', user.upImage)
router.get('/user-info', user.userInfo)

module.exports = router
