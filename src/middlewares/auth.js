const JWT = require('jsonwebtoken')
const Constants = require('../constants')

const auth = (req, res, next) => {
  try {
    const decoded = JWT.verify(req.headers.authorization, Constants.SECRET_KEY)
    const { userId, userName } = decoded
    if (!userId && !userName) {
      res.status(401).json({ statusCode: 401, error: 'Unauthorized' })
    }
    req.credentials = decoded
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ statusCode: 401, error })
  }
}

module.exports = {
  Auth: auth
}
