const fs = require('fs')
const path = require('path')
const { Router } = require('express')
const { jianli_DB, jianli_captcha_DB } = require('../../models/jianli')
const { authenticateToken } = require('../../middleware/index')

const router = Router()

/**
 * @swagger
 *  tags:
 *      - name: jinali
 *        description: 简历
 */

/**
 * @swagger
 * /api/jianli/query:
 *  get:
 *      summary: 获取简历信息
 *      tags: [jinali]
 *      parameters:
 *        - name: captcha
 *          in: query
 *          description: 分类
 *        - name: pageSize
 *          in: query
 *          description: 一页多少条数据
 *        - name: currePage
 *          in: query
 *          description: 当前页码
 *      responses:
 *          200:
 *             description: 成功
 *
 */
router.get('/query', async (req, res, next) => {
  try {
    const { captcha, pageSize, currePage } = req.query
    const query = {}

    if (captcha) {
      query.key = captcha
    }
    const total = await jianli_DB.countDocuments(query)
    const data = await jianli_DB
      .find(query)
      .skip(pageSize * currePage)
      .limit(pageSize)
    res.json({
      data,
      total,
    })
  } catch (error) {}
})
/**
 * @swagger
 * /api/jianli/captcha:
 *  get:
 *      summary: 获取简历分类
 *      tags: [jinali]
 *      responses:
 *          200:
 *             description: 成功
 *
 */
router.get('/captcha', async (req, res, next) => {
  try {
    const data = await jianli_captcha_DB.find()
    res.json({
      data,
    })
  } catch (error) {}
})
/**
 * @swagger
 * /api/jianli/download:
 *  post:
 *      summary: 管理员登录
 *      tags: [jinali]
 *      requestBody:
 *        description: "Update post object"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                path:
 *                  type: string
 *                  description: '文件地址'
 *      responses:
 *          200:
 *             description: 成功
 *
 */

router.get('/download', authenticateToken, async (req, res, next) => {
  try {
    const { dPath } = req.query
    const docPath = Array.isArray(dPath) ? dPath.join('/') : dPath
    const parsedPath = path.parse(docPath)
    const types = ['.doc', '.docx']
    for (let ext of types) {
      const fullPath = path.join(process.cwd(), 'assets', `${parsedPath.dir}/${parsedPath.name}${ext}`)
      if (fs.existsSync(fullPath)) {
        console.log(fullPath)
        const fileName = `aa${ext}`
        res.set({
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': `attachment; filename=${fileName}`,
        })
        const fileStream = fs.readFileSync(fullPath)
        res.end(fileStream)
        return
      }
    }
    res.status(404).send('File not found')
  } catch (error) {
    next(error) // 错误处理
  }
})

// router.get('/download', async (req, res, next) => {
//   try {
//     const { dPath } = req.query
//     const docPath = dPath.join('/')
//     const newPath = docPath.split('.')
//     const type = ['.doc', '.docx']
//     type.forEach((item) => {
//       const fullPath = path.join(process.cwd(), 'assets', `${newPath[0]}${item}`)
//       if (fs.existsSync(fullPath)) {
//         res.set({
//           'Content-Type': 'application/octet-stream',
//           'Content-Disposition': `attachment; filename="简历"`,
//         })
//         const fileStream = fs.readFileSync(fullPath)
//         res.send({
//           data: fileStream,
//         })
//       }
//     })
//   } catch (error) {
//     next(error)
//   }
// })
module.exports = router
