const user_router = require('./router/userRouter')
const post_router = require('./router/postRouter')
const admin_router = require('./router/adminRouter')
const captcha_router = require('./router/captchaRouter')
module.exports = function (app) {
  app.use('/api/admin', user_router)
  app.use('/api/admin', post_router)
  app.use('/api/admin', admin_router)
  app.use('/api/admin', captcha_router)
}
