const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({})
    res.status(200).json(blogs)
  } catch (err) {
    next(err)
  }
})

blogRouter.post('/', async (req, res, next) => {
  try {
    const { title, author, url, likes } = req.body

    const blog = new Blog({
      title,
      author,
      url,
      likes: likes || 0,
    })
    const response = await blog.save()
    res.status(201).json(response)
  } catch (err) {
    next(err)
  }
})

module.exports = blogRouter
