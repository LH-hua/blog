
module.exports = function (app) {
  app.use('/post', require('./article'))
  app.use('/user', require('./user'))
  app.use('/sys', require('./sys'))
}