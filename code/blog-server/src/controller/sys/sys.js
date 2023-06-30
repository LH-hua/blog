const menu = require('../../models/sys');
const captcha = require('../../models/captcha');
const nodemailer = require('nodemailer');
const svgCaptcha = require('svg-captcha');
module.exports = sys = {
  currentMenu: async (req, res, next) => {
    try {
      const { token } = req.headers
      // 判断token是否正确
      // 。。。
      const result = await menu.find({})
      res.send({
        msg: 'ok',
        data: result
      })

      // 正确返回菜单
    } catch (error) {

    }
  },
  addMenu: async (req, res, next) => {
    try {
      const { token } = req.headers
      if (token == undefined) {
        res.send({
          msg: '未定义 token 值'
        })
        return
      }
      const data = req.body
      const result = await menu.create(data)
      if (result) {
        res.send({
          msg: '添加成功',
          data: result
        })
      }
    } catch (error) {

    }
  },
  captcha: async (req, res, next) => {
    try {
      const Captcha = svgCaptcha.create()
      res.type('svg').status(200).send(Captcha.data)
      // 发送邮件
      let transporter = nodemailer.createTransport({
        host: "smtp.qq.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "1589715612@qq.com", // generated ethereal user
          pass: "oljvpgqpmegliiei", // generated ethereal password
        },
      })
      transporter.setMaxListeners(2)
      transporter.sendMail({
        from: '<1589715612@qq.com>', // 发送者邮箱
        to: req.query.email, // 发送多个，以逗号分隔开
        subject: "你正在注册LH账号", // 邮件标题
        html: `
    <p>您好：</p>
    <p>欢迎注册LH账号：您的验证码为:${Captcha.text}</P>
    <p>不要告诉任何人哦</p>
    <p><string>验证码15分钟内有效</string></p>
    <p>LH</p>
      `, // html body
      })
      const result = await captcha.create({ captcha: Captcha.text })
      if (result) {
        // 15分钟后删除验证码
        setTimeout(function () {
          captcha.deleteOne({ captcha: Captcha.text })
            .then(res => {
            console.log(res)
          })
        }, 900000)
      }
    } catch (error) {
      next(error)
    }
  }
}