const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const { secretKey } = require('../config')

function getRandomString(len) {
  let _charStr = 'abacdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789',
    min = 0,
    max = _charStr.length - 1,
    _str = '' //定义随机字符串 变量
  //判断是否指定长度，否则默认长度为15
  len = len || 15
  //循环生成字符串
  for (var i = 0, index; i < len; i++) {
    index = (function (randomIndexFunc, i) {
      return randomIndexFunc(min, max, i, randomIndexFunc)
    })(function (min, max, i, _self) {
      let indexTemp = Math.floor(Math.random() * (max - min + 1) + min),
        numStart = _charStr.length - 10
      if (i == 0 && indexTemp >= numStart) {
        indexTemp = _self(min, max, i, _self)
      }
      return indexTemp
    }, i)
    _str += _charStr[index]
  }
  return _str
}

function generateToken(info) {
  return jwt.sign({ ...info, time: new Date().getTime() }, secretKey)
}
function resloveToken(token) {
  return jwt.verify(token, secretKey, (err, decode) => {
    if (err) {
      return false
    } else {
      return decode
    }
  })
}

function getRandomNum() {
  return Math.floor(100000 + Math.random() * 900000)
}
async function emailVerify(email, code) {
  // 发送邮件
  let transporter = await nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: '1589715612@qq.com', // generated ethereal user
      pass: 'mjydxfuqzacehidb', // generated ethereal password
    },
  })
  transporter.setMaxListeners(2)
  const data = await transporter.sendMail({
    from: '<1589715612@qq.com>', // 发送者邮箱
    to: email, // 发送多个，以逗号分隔开
    subject: '邮箱验证', // 邮件标题
    text: 'lhgo邮箱验证', // plain text body
    html: `<b>[lhgo]</b><br><p>您的验证码：${code}<br/>不要告诉别人哦！</p><br/><p>验证码15分钟内有效</p>`, // html body
  })
  return data
}

module.exports = {
  getRandomString,
  generateToken,
  resloveToken,
  getRandomNum,
  emailVerify,
}
