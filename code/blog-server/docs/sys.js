/**,
 * @swagger
 * /sys/token/menuAndRouter:
 *    post:
 *      tags:
 *      - 系统
 *      summary: 获取菜单路由
 *      produces:
 *      - application/json
 *      parameters:
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