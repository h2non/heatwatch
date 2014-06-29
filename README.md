# heatwatch

> This project is a proof of concept

HeatWatch API server powered by node and redis

For a real demo, see [heatwatch-demo](https://github.com/h2non/heatwatch-demo)

## Installation

```bash
$ git clone https://github.com/h2non/heatwatch.git && cd heatwatch
```

```bash
$ npm install
```

```bash
$ npm start
```

Server will listen in port `3000`

## API

The web API requires a token to track en read data
You must define a `X-API-Token` request header

### [POST] /track
Track a set of event data

### [POST] /register
Request a new API token and read/write permissions for host

### [GET] /metrics/:host
Get data metrics per host

## License

MIT - Tomas Aparicio
