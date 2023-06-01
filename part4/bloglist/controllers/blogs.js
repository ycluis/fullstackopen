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
    const { title, author, url, likes } = req.body

    console.log(req.user) // user from userIdenHandler middleware

    if (!req.token) {
      return res.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(req.token)

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
    if (!req.token) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    // user from userIdenHandler middleware
    // console.log(req.user)

    const blog = await Blog.findById(req.params.id)

    if (!blog) {
      return res.status(404).json({ error: 'Resource not found' })
    }

    if (blog.user.toString() !== req.token) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      context: 'query',
    })
    res.status(200).json(updatedBlog)
  } catch (err) {
    next(err)
  }
})

blogRouter.delete('/:id', async (req, res, next) => {
  try {
    if (!req.token) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    // user from userIdenHandler middleware
    // console.log(req.user)

    const blog = await Blog.findById(req.params.id)

    if (!blog) {
      return res.status(404).json({ error: 'Resource not found' })
    }

    if (blog.user.toString() !== req.token) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = blogRouter
