const OpenAI = require('openai')
const { Router } = require('express')
const router = Router()
console.log(process.env.openai_api_key)
const openai = new OpenAI({
  organization: process.env.openai_api_key,
})

/**
 * @swagger
 *  tags:
 *      - name: openAI
 *        description: openAI
 *
 * components:
 *  schemas:
 *      openAI:
 *        type: object
 *        properties:
 *          test1:
 *             type: string
 *          test2:
 *             type: string
 */

/**
 * @swagger
 * /api/open-ai/test:
 *   post:
 *     summary: openAI
 *     description: 测试
 *     tags: [openAI]
 *     requestBody:
 *       description: 创建测试对象
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/openAI'
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
