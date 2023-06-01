const User = require('../models/user')

const userIdenHandler = async (req, res, next) => {
  if (!req.token) {
    req.user = null
  } else {
    const user = await User.findById(req.token).select(['-__v', '-password'])
    req.user = user
  }

  next()
}

module.exports = userIdenHandler
