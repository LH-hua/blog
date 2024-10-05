const jwt = require('jsonwebtoken')

const secretKey = 'lhgo-hua'
exports.admin_sign = (info) => {
  return jwt.sign({ ...info, time: new Date().getTime() }, secretKey)
}
exports.user_sign = (info) => {
  return jwt.sign({ ...info, time: new Date().getTime() }, secretKey)
}
