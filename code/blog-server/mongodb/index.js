const { MongoClient } = require('mongodb')
const host = "localhost"
const port = 27017
const uri = `mongodb://${host}:${port}`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function conect(dbName, collection, callback) {
    try {
        await client.connect();
        const db = await client.db(dbName);
        const collections = await db.collection(collection);
        await callback(collections)
    } catch (error) {
        client.close();
    }
}
module.exports = {
    conect
}