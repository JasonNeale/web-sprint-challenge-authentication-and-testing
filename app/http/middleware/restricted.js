const jwt = require('jsonwebtoken')
const secrets = require('../../../config/secrets')

module.exports = (req, res, next) => {

  try {
    const token = req.headers.authorization

      jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        console.log(err)
        if (err) {
          res.status(401).json({ message: 'You are not authorized to view this.' })
        } else {
          req.decodedJwt = decodedToken
          next()
        }
      })
  } catch (err) {
    res.status(401).json({ error: err.message })
  }

}