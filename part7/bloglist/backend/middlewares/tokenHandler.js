const jwt = require('jsonwebtoken')

const tokenHandler = (req, res, next) => {
  const authorization = req.headers.authorization
  if (!authorization || !authorization.startsWith('bearer ')) {
    req.token = null
  } else {
    const decodedToken = jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET)

    if (!decodedToken.id) {
      req.token = null
    }

    req.token = decodedToken.id
  }

  next()
}

module.exports = tokenHandler
