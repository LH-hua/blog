
module.exports = function (app){
    app.use('/api',require('./article'))
    app.use('/api',require('./user'))
}