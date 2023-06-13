const { Router } = require('express')
const router = Router()

const article = require('../../controller/article')

router.get('/articles',article.articles)
router.get('/detail',article.detail)
router.post('/add',article.add)

module.exports = router