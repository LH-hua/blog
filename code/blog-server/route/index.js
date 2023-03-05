
module.exports = function (app){
    app.use((err,req,res,next) => {
        res.status(500).send(err.message)
    })
    app.use('/api',require('./article'))
    app.use('/api',require('./user'))
}