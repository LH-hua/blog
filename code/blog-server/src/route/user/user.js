const { Router } = require('express')
const formidable = require('formidable')
const router = Router()
const user = require('../../controller/user')

router.post('/login', user.login)
router.post('/regsiter', user.regsiter)
router.post('/upload-image', (req, res, next) => {
    try {
        const from = formidable()
        from.parse(req, (err, fields, files) => {
            if (err) {
                next(err)
                return
            }
            console.log(fields)
            console.log(files)

        })
        if (!req.body.image) {
            res.send({
                msg: req.body
            })
            return
        }
        next()
    } catch (error) {

    }

}, user.upImage)

module.exports = router