const host = 'localhost'
const port = 27017
const db = 'blog'
exports.host = host
exports.port = port
exports.db = db
exports.dbUrl = `mongodb://${host}:${port}/${db}`
