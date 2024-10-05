const { Router } = require('express')
const router = Router()

const captcha_controller = require('../controller/captchaController')

router.get('/captcha/update', captcha_controller.captcha_update) // 管理员列表

module.exports = router
