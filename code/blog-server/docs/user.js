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

/**,
     * @swagger
     * /user/post/login:
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
     * /user/post/regsiter:
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