const { Router } = require('express')
const router = Router()

const article = require('../../Controller/article')

router.get('/articles',article.articles)
router.get('/detail',article.detail)

module.exports = router