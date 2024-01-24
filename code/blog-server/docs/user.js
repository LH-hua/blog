/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type:object
 *         require:
 *            - username
 *            - userpasword
 *         properties:
 *            username:
 *              type:string
 *              description: 用户唯一标识
 *            password:
 *              type:string
 *              description: 用户唯一标识
 */

/**,
 * @swagger
 *
 * components:
*    schemas:
*      User:
*        type:object
*         require:
*            - username
*            - userpasword
*         properties:
*            username:
*              type:string
*              description: 用户唯一标识
*            password:
*              type:string
*              description: 用户唯一标识
 *
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
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *          description: successful operation
 *        400:*
 *          description: Invalid ID supplied
 *        404:
 *          description: Order not found
 *
 * /api/user/user-info:
 *    get:
 *      tags:
 *      - 用户
 *      summary: 获取用户信息
 *      produces:
 *      - application/json
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

/**
 * @swagger
 * /api/user/upload-image:
 *   post:
 *     tags:
 *      - 用户
 *     summary: 图片上传.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *     responses:
 *       200:
 *         description: OK
 */
