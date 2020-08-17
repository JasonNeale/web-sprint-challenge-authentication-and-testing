const bcryptjs = require('bcryptjs')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets')
const Users = require('../app/users')
const { isValid } = require('../resources/js/users-service')


router.post('/register', (req, res) => {
  const credentials = req.body

  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8
    const hash = bcryptjs.hashSync(credentials.password, rounds)

    credentials.password = hash

    Users.add(credentials)
    .then(user => {
      res.status(201).json({ data: user })
    })
    .catch(error => { res.status(500).json({ error: error.message })
    })
  } else {
    res.status(400).json({ error: 'Please provide both username AND password. The password should be alphanumeric.' })
  }
})

router.post('/login', (req, res) => {
  const { username, password } = req.body

  if (isValid(req.body)) {
    Users.findBy({ username: username })
    .then(([user]) => {
      if (user && bcryptjs.compareSync(password, user.password)) {
        const token = generateToken(user)
        localStorage.setItem({token: token})
        res.status(200).json({ message: 'Welcome to our API', token })
        } else {
          res.status(401).json({ error: 'Invalid credentials' })
        }
      })
      .catch(error => { res.status(500).json({ error: error.message }) 
      })
  } else {
    res.status(400).json({ error: 'Please provide both username AND password. The password should be alphanumeric.' })
  }
})

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role
  }

  const options = {
    expiresIn: '2h'
  }

  return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router