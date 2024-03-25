module.exports = (err, data, res) => {
  if (err) {
    return res.sendStatus(500).send({
      msg: '服务器内部错误',
      err: err,
    })
  }
  return res.sendStatus(200).send({
    msg: 'ok',
    data: data,
  })
}
