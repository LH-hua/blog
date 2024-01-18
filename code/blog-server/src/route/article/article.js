const { Router } = require('express')
const router = Router()

const article = require('../../controller/article')
const middel = require('../../middleware/index')

router.get('/articles', article.articles)
router.get('/detail', article.detail)
router.post('/add', middel.authorization, article.add)

module.exports = router
