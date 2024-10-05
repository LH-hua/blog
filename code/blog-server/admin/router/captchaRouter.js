const { Router } = require('express')
const router = Router()

const captcha_controller = require('../controller/captchaController')
/**
 * @swagger
 * /api/admin/captcha/update:
 *  post:
 *      summary: 更新话题
 *      tags: [Post]
 *      security:
 *        - basicAuth: []
 *      requestBody:
 *        description: "Update post object"
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: '名称'
 *                captcha_id:
 *                  type: string
 *                  description: '话题分类id'
 *                text:
 *                  type: string
 *                  description: '描述'
 *      responses:
 *          200:
 *             description: 成功
 *
 */
router.post('/captcha/update', captcha_controller.captcha_update) // 话题列表

module.exports = router
