const express = require('express')
const logger = require('morgan')
const uuid = require('uuid')
const bodyParser = require('body-parser')

const Config = require('./src/config')
const Constants = require('./src/constants')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// path upload
app.use('/api/upload', express.static(Constants.UPLOAD))

//Request Log
app.use(
  logger(function (tokens, req, res) {
    if (tokens.method(req, res) === 'OPTIONS') {
      return ''
    }
    const id = uuid.v4()
    const newLine = '*\n*\n*'
    const startDate = new Date()
    startDate.setMilliseconds(startDate.getMilliseconds() - parseInt(tokens['response-time'](req, res)))
    const endDate = new Date()
    return [
      `========== [${startDate.toISOString()}] --> ${id} ==========`,
      newLine,
      `url: ${tokens.url(req, res)}`,
      `method: ${tokens.method(req, res)}`,
      `headers: ${JSON.stringify(
        {
          authorization: req.headers.authorization || 'none'
        },
        null,
        2
      )}`,
      `body: ${JSON.stringify(
        {
          ...req.body,
          password: undefined
        },
        null,
        2
      )}`,
      `status: ${tokens.status(req, res)}`,
      newLine,
      `========== [${endDate.toISOString()}] --> ${id} ==========`
    ].join('\n')
  })
)

// routes
require('./src/routes')(app)

// server start
const port = Constants.PORT || 8001
app.listen(port)
console.log(`Server listening on ${port}`)

//show all api
const showAllApi = () =>
  app._router.stack
    .filter((r) => r.route)
    .map((r) => Object.keys(r.route.methods)[0].toUpperCase().padEnd(7) + r.route.path)
    .join('\n')

console.log(showAllApi())

// connect db
Config.database.connect(Constants.DB_URL)
