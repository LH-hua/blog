/**
 * @swagger
 * "components": {
 *       "schemas": {
 *           "menu": {
 *               "properties": {
 *                   "id": {
 *                       "type": "string"
 *                   },
 *                   "pid": {
 *                       "type": "string"
 *                   },
 *                   "name": {
 *                       "type": "string"
 *                   },
 *                   "icon": {
 *                       "type": "string"
 *                   },
 *                   "url": {
 *                       "type": "string"
 *                   },
 *                    "children": {
 *                       "type": "Array"
 *                   }
 *               }
 *           }
 *       }
 *   }
 */

/**
 * @swagger
 * /api/article/add:
 *    post:
 *      tags:
 *      - 文章
 *      summary: 增加菜单
 *      consumes:
 *         - application/json
 *      requestBody:
 *          description: 增加菜单
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/menu'
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