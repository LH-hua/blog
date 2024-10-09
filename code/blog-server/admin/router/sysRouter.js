const { Router } = require('express')
const router = Router()

const sys_controller = require('../controller/sysController')

router.get('/sys/menus/list', sys_controller.menu_list) // 菜单
router.post('/sys/menus/root/add', sys_controller.menu_add) // 增加跟目录导航

module.exports = router
