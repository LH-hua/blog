const { Router } = require('express')
const router = Router()

const user = require('../../controller/user')

router.post('/login',user.login)
router.post('/regsiter', user.regsiter)
router.get('/test', (req, res, next) => {
  console.log(1)
  next()
}, (req, res, next) => {
  console.log(2)
  next()
}, (req, res, next) => {
  res.send({
    msg:'ok'
  })
})

module.exports = router