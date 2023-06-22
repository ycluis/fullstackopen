const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1, id: 1 })
    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
})

userRouter.post('/', async (req, res, next) => {
  try {
    const { username, name, password } = req.body

    if (!password || password.length < 3) {
      return res.status(400).json({ error: 'Password cannot be empty and length must be at least 3 characters' })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
      username,
      name,
      password: passwordHash,
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
  } catch (err) {
    next(err)
  }
})

module.exports = userRouter
