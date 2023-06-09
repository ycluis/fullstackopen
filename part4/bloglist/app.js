const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const userIdenHandler = require('./middlewares/userIdenHandler')
const tokenHandler = require('./middlewares/tokenHandler')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.json())
app.use(cors())

console.log('Connecting to MongoDB...')

mongoose
  .connect(config.MONGO_URI)
  .then((res) => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB: ', err.message)
  })

app.use(tokenHandler)
app.use('/api/blogs', userIdenHandler, require('./controllers/blogs'))
app.use('/api/users', require('./controllers/users'))
app.use('/api/login', require('./controllers/login'))
if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', require('./controllers/e2e'))
}
app.use(errorHandler)

module.exports = app
