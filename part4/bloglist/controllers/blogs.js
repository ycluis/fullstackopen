const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.status(200).json(blogs)
  } catch (err) {
    next(err)
  }
})

blogRouter.post('/', async (req, res, next) => {
  try {
    const { title, author, url, likes, userId } = req.body

    const user = await User.findById(userId)

    const blog = new Blog({
      title,
      author,
      url,
      likes: likes || 0,
      user: user.id,
    })

    const response = await blog.save()

    user.blogs = user.blogs.concat(response._id)
    await user.save()

    res.status(201).json(response)
  } catch (err) {
    next(err)
  }
})

blogRouter.put('/:id', async (req, res, next) => {
  try {
    await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, context: 'query' })
    res.status(200).json(req.body)
  } catch (err) {
    next(err)
  }
})

blogRouter.delete('/:id', async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = blogRouter
