const { Router } = require('express')
const router = Router()

const admin_controller = require('../controller/adminController')

router.post('/login', admin_controller.admin_login) // 管理员登录
router.post('/regsiter', admin_controller.admin_register) // 管理员注册
router.get('/list', admin_controller.admin_list) // 管理员列表
router.post('/update', admin_controller.admin_update) // 管理员更新

module.exports = router
