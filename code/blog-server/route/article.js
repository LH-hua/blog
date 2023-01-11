const route = require('express').Router()
const _ = require('lodash');
const { article } = require('../mongodb/schema')
// const { conect} = require('../mongodb/index')
function send(data,res){
    res.send({
        msg:'ok',
        data: data
    })
}
/**,
 * @swagger
 * /api/get/articles:
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

route.get('/api/get/articles/list', async (req, res) => {
    try {
        let result = await article.find({},{body:0})
        send(result,res)
    } catch (error) {
        console.log(error)
    }
})
/**,
 * @swagger
 * /api/get/articles/id:
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
route.get('/api/get/articles/id',async (req,res) => {
    let {_id } = _.assign(req.body, req.query, req.params)
    try {
        let result = await article.findOne({_id:_id})
        send(result,res)
    } catch (error) {
        console.log(error)
    }
})
/**,
 * @swagger
 * /api/get/articles/title:
 *    get:
 *      tags:
 *      - 文章
 *      summary: 根据文章标题查询文章
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: title
 *        in: query
 *        description: 文章title
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
route.get('/api/get/articles/title',async (req,res) => {
    let {title } = _.assign(req.body, req.query, req.params)
    try {
        let result = await article.findOne({title:title})
        send(result,res)
    } catch (error) {
        console.log(error)
    }
})
/**
 * @swagger
 * /api/post/add/articles:
 *    post:
 *      tags:
 *      - 文章
 *      summary: 添加文章
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: title
 *        description: 用户名字
 *        in: query
 *        required: true
 *        type: string
 *      - name: body
 *        in: query
 *        description: 内容
 *        required: true
 *        type: string
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
route.post('/api/post/add/articles', async (req, res) => {
    let { title, body } = _.assign(req.body, req.query, req.params)
    let result = '失败'
    if (title && body) {
        try {
            let data = await article.create({ title: title, body: body })
            console.log(data)
            if (data) {
                result = '成功'
            }
        } catch (error) {
            console.log(error)
        }
    }
    res.send({
        data: result
    })
})

module.exports = route