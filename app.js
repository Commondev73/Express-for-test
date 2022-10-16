const express = require('express')
const logger = require('morgan')
const uuid = require('uuid')

const Config = require('./src/config')
const Constants = require('./src/constants')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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
          password: 'detected to remove'
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
app._router.stack.forEach((router) => {
  if (router.route && router.route.path) {
    console.log(router.route.path)
  }
})

// connect db
Config.database.connect(Constants.DB_URL)
