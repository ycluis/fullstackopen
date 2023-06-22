const e2eRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

e2eRouter.post('/reset', async (req, res, next) => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  res.status(204).end()
})

module.exports = e2eRouter
