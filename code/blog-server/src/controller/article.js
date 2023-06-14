
const posts = require('../models/post')
const _ = require('lodash')
const moment = require('moment')

/**
 * @swagger
 * "components": {
 *       "schemas": {
 *           "post": {
 *               "properties": {
 *                   "title": {
 *                       "type": "string"
 *                   },
 *                   "body": {
 *                       "type": "string"
 *                   }
 *               }
 *           }
 *       }
 *   }
 */
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
            let result = await posts.find({}, { body: 0 })
            // console.log(result)
            res.send({
                msg: result
            })
        } catch (error) {
            next(error)
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
    detail: async (req, res, next) => {
        let { _id } = _.assign(req.body, req.query, req.params)
        try {
            let result = await posts.findOne({ _id: _id })
            res.send(result)
        } catch (error) {
            next(error)
        }
    },
    /**
     * @swagger
     * /api/article/add:
     *    post:
     *      tags:
     *      - 文章
     *      summary: 添加文章
     *      consumes:
     *         - application/json
     *      requestBody:
     *          description: 添加文章
     *          content:
     *              application/json:
     *                  schema:
     *                      $ref: '#/components/schemas/post'
     *      responses:
     *        200:
     *          description: successful operation
     *          schema:
     *            ref: #/definitions/Order
     *        400:
     *          description: Invalid ID supplied
     *        404:
     *          description: Order not found
     * 
     */

    add: async (req, res) => {
        const { title, body } = req.body
        const result = await posts.create({
            dete: moment().format('YYYY-MM-DD HH:mm:ss'),
            title: title,
            body: body
        })
        if (result) {
            res.send({
                type: 'success',
                msg: '文章添加成功了'
            })
        }
    }
}
module.exports = article