// import OpenAI from 'openai'
const OpenAI = require('openai')
const { Router } = require('express')
const router = Router()
const openai = new OpenAI({
  organization: process.env.openai_api_key,
})

/**
 * @swagger
 *  tags:
 *      - name: chartgpt
 *        description: chartgpt
 *
 * components:
 *  schemas:
 *      chartGPT:
 *        type: object
 *        properties:
 *          test1:
 *             type: string
 *          test2:
 *             type: string
 */

/**
 * @swagger
 * /api/chart/test:
 *   post:
 *     summary: chartGPT
 *     description: 测试
 *     tags: [chartgpt]
 *     requestBody:
 *       description: 创建测试对象
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/chartGPT'
 *     responses:
 *       '200':
 *         description: 成功
 */
router.post('/test', async (req, res, next) => {
  console.log(req.body)
  try {
    const stream = await openai.chat.completions.create(
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'Say this is a test' }],
        stream: true,
      },
      {
        proxy: {
          host: '127.0.0.1',
          port: '10809',
          protocol: 'socks5',
        },
      }
    )
    for await (const chunk of stream) {
      //   process.stdout.write(chunk.choices[0]?.delta?.content || '')
      console.log(chunk)
    }
  } catch (error) {
    console.log(error)
  }
})
module.exports = router
