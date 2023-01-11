const route = require('express').Router()
const _ = require('lodash');
const { article } = require('../mongodb/schema')
const { conect} = require('../mongodb/index')
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

route.get('/api/get/articles', async (req, res) => {
    let { _id, title } = _.assign(req.body, req.query, req.params)
    let result = null
    if (_id) {
        try {
            conect('blog','posts', async function(db){
                result = await db.findOne({_id:_id})
                send(result)
            })
        } catch (error) {
            console.log(error)
        }
    } if (title) {
        try {
            conect('blog','posts', async function(db){
                result = await db.findOne({title:title})
                send(result)
            })
        } catch (error) {
            console.log(error)
        }
    } if(!_id && !title) {
        try {
            conect('blog','posts', async function(db){
                result = await db.find({})
                send(result)
            })
        } catch (error) {
            console.log(error)
        }
    }
    function send(data){
        res.send({
            data: data
        })
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