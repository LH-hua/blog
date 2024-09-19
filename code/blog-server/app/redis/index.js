const redis = require('redis')

let client = null

function createRedisClient() {
  if (!client) {
    client = redis.createClient()
    client.on('connect', () => {
      console.log('Redis连接成功')
    })
    client.on('error', (error) => {
      console.error('Redis连接错误', error)
    })
  }
  return client
}

module.exports = createRedisClient
