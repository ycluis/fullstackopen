const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const logger = require('./utils/logger')
const config = require('./utils/config')
const phonebookRouter = require('./controllers/phonebooks')
const unknowRouteHandler = require('./middlewares/404Handler')
const errorHandler = require('./middlewares/errorHandler')

mongoose.set('strictQuery', false)

logger.info(`Connecting to ${config.MONGO_URI}`)

mongoose
  .connect(config.MONGO_URI)
  .then((res) => {
    logger.info('Connected to MongoDB')
  })
  .catch((err) => {
    logger.error('Error connecting to MongoDB: ', err.message)
  })

app.use(express.json())
app.use(cors())

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      tokens.body(req, res),
    ].join(' ')
  }),
)

app.use(express.static('build'))
app.use('/api', phonebookRouter)
app.use(unknowRouteHandler)
app.use(errorHandler)

module.exports = app
