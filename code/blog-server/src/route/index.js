
module.exports = function (app) {
  app.use('/api/post', require('./article'))
  app.use('/api/user', require('./user'))
  app.use('/api/sys', require('./sys'))
}