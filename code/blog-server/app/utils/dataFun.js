module.exports = (err, data, res) => {
  if (err) {
    return res.sendStatus(500).send({
      msg: '服务器内部错误',
      err: err,
    })
  }
  return res.send({
    msg: 'ok',
    data: data,
  })
}
