const { Router } = require('express')
const router = Router()

const post_controller = require('../controller/postController')

router.get('/post/list', post_controller.post_list) // 文章列表
router.post('/post/list/audit', post_controller.post_audit) // 文章审核

module.exports = router
