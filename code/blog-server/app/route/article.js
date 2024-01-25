const { Router } = require('express')
const router = Router()

const article = require('../controller/article')
const Middleware = require('../middleware/index')

router.get('/list', article.articles)
router.get('/detail', article.detail)
router.post('/add', new Middleware().authorization, article.add)

module.exports = router
