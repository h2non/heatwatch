var restify = require('restify')
var api = require('./lib/api')

var server = restify.createServer({
  name: 'heatwatch'
})

server.use(restify.fullResponse())
server.use(api.validator)
server.use(restify.queryParser())
server.use(restify.bodyParser({
  maxBodySize: 1048576,
  mapParams: false,
  mapFiles: false,
  overrideParams: false
}))

server.post('/track', api.track)
server.post('/register', api.register)
server.get('/metrics/:host', api.metrics)
server.opts(/\.*/, function (req, res, next) {
  res.send(204)
})

server.listen(3000, function () {
  console.log('%s listening at %s', server.name, server.url)
})
