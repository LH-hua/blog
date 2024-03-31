const article = require('./article')
const user = require('./user')
const sys = require('./sys')
// const chartGPT = require('./openai')
const file = require('./file')
const preject = require('./preject')

module.exports = (app) => {
  app.use('/api/post', article)
  app.use('/api/user', user)
  app.use('/api/sys', sys)
  // app.use('/api/open-ai', chartGPT)
  app.use('/api/file', file)
  app.use('/api/preject', preject)
}
