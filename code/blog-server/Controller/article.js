// const article = (req,res,next) => {
//     res.send({ok:'ok'})
// }
const db = require('../mongodb/schema/article')
const _ = require('lodash')

const article = {
/**,
 * @swagger
 * /api/article/articles:
 *    get:
 *      tags:
 *      - 文章
 *      summary: 查询文章列表
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: title
 *        in: query
 *        description: 文章标题
 *        required: false
 *        type: string
 *      - name: id
 *        in: query
 *        description: 文章ID
 *        required: false
 *        type: integer
 *      responses:
 *        200:
 *          description: successful operation
 *          schema:
 *            ref: #/definitions/Order
 *        400:
 *          description: Invalid ID supplied
 *        404:
 *          description: Order not found
 * */
    articles: async (req, res, next) => {
        try {
            let result = await db.find({}, { body: 0 })
            // console.log(result)
            res.send({
                msg: result
            })
        } catch (error) {
            console.log(error)
            next()
        }
    },
    /**,
    * @swagger
    * /api/article/detail:
    *    get:
    *      tags:
    *      - 文章
    *      summary: 根据文章ID查询文章
    *      produces:
    *      - application/json
    *      parameters:
    *      - name: _id
    *        in: query
    *        description: 文章ID
    *        required: false
    *        type: integer
    *      responses:
    *        200:
    *          description: successful operation
    *          schema:
    *            ref: #/definitions/Order
    *        400:
    *          description: Invalid ID supplied
    *        404:
    *          description: Order not found
    * */
    detail: async (req, res) => {
        let { _id } = _.assign(req.body, req.query, req.params)
        try {
            let result = await db.findOne({ _id: _id })
            res.send(result)
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = article