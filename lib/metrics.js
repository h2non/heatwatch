var redis = require('./redis')
var _ = require('lodash')

module.exports = function (req, res, next) {
  var host = req.params.host
  var path = req.params.path

  function process(data) {
    data = _.flatten(data).map(function (str) {
      return JSON.parse(str)
    }).map(function (arr) {
      return arr.filter(function (o) {
        if (!path || path === '*') {
          return true
        } else {
          return new RegExp(o.path).test(path)
        }
      }).map(function (o) {
        return { x: o.x, y: o.y }
      }).filter(function (o) {
        return o.x && o.y
      })
    })
    return _.flatten(data)
  }

  redis.multi()
    .smembers(host + ':click')
    .smembers(host + ':mouse')
    .exec(function (err, data) {
      if (err) { return res.send(500) }
      if (!data) { return res.send(404) }
      if (!data[0].length) { return res.send(404) }

      data = {
        series: process(data)
      }

      res.send(200, data)
      next()
    })
}
