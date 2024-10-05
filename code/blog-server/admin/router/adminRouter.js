const { Router } = require('express')
const router = Router()

const admin_controller = require('../controller/adminController')

router.post('/login', admin_controller.admin_login) // 管理员登录

module.exports = router
