/**
 * @swagger
 *  tags:
 *      - name: easyHouse
 *        description: 易事屋
 */
const { Router } = require('express')
const router = Router()

const { easyDB } = require('../../models/easyHouse')
/**
 * @swagger
 * /api/easyHouse/list:
 *  get:
 *      summary: 列表
 *      tags: [easyHouse]
 *      parameters:
 *        - name: title
 *          in: query
 *          description: 标题
 *      responses:
 *          200:
 *             description: 成功
 *
 */
router.get('/list', async (req, res, next) => {
  try {
    // await easyDB.insertMany([
    //   {
    //     text: '那年夏天，我的朋友和她走在一起',
    //     u_id: Object('66e675b4b7366d27c5a61292'),
    //   },
    //   {
    //     text: '还记得那天是个炎热的下午，我瞧瞧的钻进了。。。。。',
    //     u_id: Object('66e8307cbf3029b3998dad41'),
    //   },
    //   {
    //     text: '记第一次被父母混合双打。。。',
    //     u_id: Object('66e8423ad3ecf3e9d9f6740b'),
    //   },
    //   {
    //     text: '对过去挥挥手。。',
    //     u_id: Object('66e675b4b7366d27c5a61292'),
    //   },
    // ])
    const { title } = req.query
    const reg = new RegExp(title, 'i')
    const data = await easyDB.aggregate([
      {
        $match: {
          title: reg,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'u_id',
          foreignField: '_id',
          as: 'auther',
        },
      },
      {
        $unwind: '$auther',
      },
      {
        $project: {
          'auther.password': 0,
          'auther.email': 0,
          'auther.phone': 0,
          'auther.admin': 0,
          'auther.name': 0,
        },
      },
    ])
    res.json({
      msg: 'ok',
      status: 200,
      data,
    })
  } catch (error) {
    next(error)
  }
})
module.exports = router
