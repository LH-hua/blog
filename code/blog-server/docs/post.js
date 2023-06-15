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

