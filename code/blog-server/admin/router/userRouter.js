const { Router } = require('express')
const router = Router()

const user_controller = require('../controller/userController')

router.get('/user/list', user_controller.user_list) // 用户列表

module.exports = router
