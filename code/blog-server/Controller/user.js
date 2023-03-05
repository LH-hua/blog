const User = require('../mongodb/schema/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const salt = bcrypt.genSaltSync(10)
/**
 * @swagger
 * "components": {
 *       "schemas": {
 *           "user": {
 *               "properties": {
 *                   "username": {
 *                       "type": "string"
 *                   },
 *                   "password": {
 *                       "type": "string"
 *                   }
 *               }
 *           }
 *       }
 *   }
 */
const user = {
    /**,
     * @swagger
     * /api/user/login:
     *    post:
     *      tags:
     *      - 用户
     *      summary: 登录
     *      consumes:
     *         - application/json
     *      requestBody:
     *          description: 使用用户名和密码登录
     *          content:
     *              application/json:
     *                  schema:
     *                      $ref: '#/components/schemas/user'
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
     * /api/user/regsiter:
     *    post:
     *      tags:
     *      - 用户
     *      summary: 注册
     *      consumes:
     *         - application/json
     *      requestBody:
     *          description: 使用用户名和密码登录
     *          content:
     *              application/json:
     *                  schema:
     *                      $ref: '#/components/schemas/user'
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
    login: async (req, res, next) => {
        console.log(req.body)
        // console.log(req)
        try {
            let result = await User.findOne({username:req.body.username})
            console.log(result)
            if(!result.username){
                res.send({
                    msg:'用户名或密码错误'
                })
                return
            }
            const isTure = bcrypt.compareSync(req.body.password,result.password)
            console.log(isTure)
            if(!isTure){
                res.send({
                    msg:'错误'
                })
                return
            }
            const token = jwt.sign(toString(result._id),'huaker')
            res.send({
                msg:'登录成功',
                token:token
            })
        } catch (error) {
            next(error)
        }
    },
    regsiter:async(req,res,next) => {
        try {
            const result = await User.create({
                username:req.body.username,
                password:bcrypt.hashSync(req.body.password,salt)
            })
            if(result){
                res.status(200).send(result)
            }
        } catch (error) {
            res.status(404).send({
                msg:'注册失败',
                error:error
            })
            next(error)
        }
    }
}
module.exports = user