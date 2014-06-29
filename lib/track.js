var redis = require('./redis')

module.exports = function (req, res, next) {
  if (!req.body) {
    return res.send(400)
  }

  function save(app, type, data) {
    var key = app + ':' + type

    redis.send_command('SADD', [ key, JSON.stringify(data) ], function (err, obj) {
      res.send(200, { sucess: true })
      next()
    })

    /*
    redis.send_command('LPUSH', [ key, JSON.stringify(data) ], function (err, obj) {
      console.log(err, obj)
      client.send_command('LRANGE', [ key, 0, 1 ], function (err, obj) {
        console.log(obj)
      })
    })
    */
  }

  function store(data) {
    var app = data.app

    Object.keys(data.data).forEach(function (key) {
      save(app, key, data.data[key])
    })
  }

  store(JSON.parse(req.body))
}
