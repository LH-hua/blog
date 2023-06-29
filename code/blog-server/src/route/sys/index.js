const { Router } = require('express')
const router = Router()
const nodemailer = require('nodemailer');
const svgCaptcha = require('svg-captcha')

router.use('/token', require('./sys'))
router.use('/Captcha', (req, res, next) => {

    const Captcha = svgCaptcha.create()
    console.log(Captcha.text)
    res.type('svg').status(200).send(Captcha.data)

    // 发送邮件
    // let transporter = nodemailer.createTransport({
    //     host: "smtp.qq.com",
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //         user: "1589715612@qq.com", // generated ethereal user
    //         pass: "cbltricnvnfxbabh", // generated ethereal password
    //     },
    // })
    // transporter.setMaxListeners(2)
    // let info = transporter.sendMail({
    //     from: '"Fred Foo 👻" <1589715612@qq.com>', // 发送者邮箱
    //     to: "1461901580@qq.com,307598187@qq.com,623829724@qq.com,361608279@qq.com,641645362@qq.com", // 发送多个，以逗号分隔开
    //     subject: "今日西溪数据截屏", // 邮件标题
    //     text: "今日西溪数据截屏", // plain text body
    //     html: "<b>今日西溪数据</b><br><img src='cid:image'", // html body
    //     attachments: [
    //         // 发送的附件，可发送多个附件（以对象的形式发送）
    //         // {
    //         //     filename:"example.png",
    //         //     path:"example.png",
    //         //     cid:"image"
    //         // }
    //     ]
    // })
})


module.exports = router