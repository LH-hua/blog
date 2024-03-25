module.exports = (err, data, res) => {
  if (err) {
    return res.setStatus(500).send({
      msg: err,
    })
  }
  return res.send({
    msg: 'ok',
    data: data,
  })
}
