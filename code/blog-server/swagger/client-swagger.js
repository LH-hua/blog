const path = require('path')
const express = require('express')
const swaggerUI = require('swagger-ui-express')
const swaggerDoc = require('swagger-jsdoc')

// 配置 swagger-jsdoc
const client_options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '客户端API',
      version: '1.0.0',
      description: `lhgo时光印记客户端接口API文档`,
    },
  },
  apis: [path.join(__dirname, '../app/route/*/*.js')],
}

const admin_options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '管理员API',
      version: '1.0.0',
      description: `lhgo时光印记管理员接口API文档`,
    },
  },
  apis: [path.join(__dirname, '../admin/router/*.js')],
}

// 返回 JSON 格式的 Swagger 文档
const swaggerJson = (req, res) => {
  console.log(req.url) // 确认请求的路径
  if (req.path === '/api-docs-1/swagger.json') {
    // 使用 req.path 进行严格匹配
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerDoc(client_options)) // 动态生成客户端 Swagger 规范
  } else if (req.path === '/api-docs-2/swagger.json') {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerDoc(admin_options)) // 动态生成管理员 Swagger 规范
  } else {
    res.status(404).send('Not Found')
  }
}

// 初始化 Swagger UI
const clientInstall = function (app) {
  if (!app) {
    app = express()
  }

  // 客户端 API 文档
  app.get('/api-docs-1/swagger.json', swaggerJson)
  app.use(
    '/api-docs-1',
    swaggerUI.serveFiles(swaggerDoc(client_options), {}), // 独立使用 swaggerUI.serveFiles
    swaggerUI.setup(swaggerDoc(client_options)) // 独立配置客户端文档
  )

  // 管理员 API 文档
  app.get('/api-docs-2/swagger.json', swaggerJson)
  app.use(
    '/api-docs-2',
    swaggerUI.serveFiles(swaggerDoc(admin_options), {}), // 独立使用 swaggerUI.serveFiles
    swaggerUI.setup(swaggerDoc(admin_options)) // 独立配置管理员文档
  )
}

module.exports = clientInstall
