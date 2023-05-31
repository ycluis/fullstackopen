const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
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

app.use('/api/blogs', require('./controllers/blogs'))
app.use('/api/users', require('./controllers/users'))
app.use(errorHandler)

module.exports = app
