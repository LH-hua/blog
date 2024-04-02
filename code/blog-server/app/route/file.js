const { Router } = require('express')
const router = Router()
const multiparty = require('multiparty')

/**
 * @swagger
 * tags:
 *  - name: File
 *    description: '文件'
 */

/**
 * @swagger
 * /api/file/upload-image:
 *   post:
 *     summary: 上传图片
 *     tags: [File]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: 成功上传图片
 */

router.post('/upload-image', (req, res, next) => {
  try {
    const form = new multiparty.Form({
      autoFiles: true,
      // uploadDir: process.platform == 'win32' ? `${__dirname.repeat('app\route', '')}assets/image` : '/var/local/media/nodeAssets/image',
      uploadDir: process.platform == 'win32' ? 'F:/DCIM/preject' : '/var/local/media/nodeAssets/image',
    })
    form.parse(req, (err, fields, files) => {
      if (err) {
        res.send({
          msg: '保存失败',
          err: err,
        })
        return
      }
    })
    form.on('file', (name, file) => {
      let fileArr
      if (process.platform === 'win32') {
        fileArr = file.path.split('\\')
      } else {
        fileArr = file.path.split('/')
      }
      res.send({ src: `/images/${fileArr[fileArr.length - 1]}` })
    })
  } catch (error) {
    res.send({
      msg: 'error:' + error,
    })
    next(err)
  }
})
module.exports = router
