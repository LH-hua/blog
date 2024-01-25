const article = require('./article')
const user = require('./user')
const sys = require('./sys')

module.exports = app => {
  app.use('/api/post', article)
  app.use('/api/user', user)
  app.use('/api/sys', sys)
}
