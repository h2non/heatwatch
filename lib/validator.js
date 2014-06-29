
function setCORS(req, res) {
  var allowHeaders = ['Accept', 'Accept-Version', 'Content-Type', 'X-API-Token', 'X-Version']
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers'] || allowHeaders.join(', '))
  res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method'] || 'GET, POST, DELETE, PUT')
  res.header('Access-Control-Allow-Origin', req.headers.origin)
}

module.exports = function (req, res, next) {
  if (req.headers.origin) {
    setCORS(req, res)
  }
  if (req.method !== 'OPTIONS') {
    if (!req.headers['x-api-token']) {
      return res.send(403)
    }
  }
  next()
}
