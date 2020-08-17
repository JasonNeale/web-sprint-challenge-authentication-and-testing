const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const authRouter = require('./routes/auth')
const jokesRouter = require('./routes/jokes')
const server = express()


server.use(helmet())
server.use(express.json())
server.use(cors())

server.use('/api/auth', authRouter)
server.use('/api/jokes', jokesRouter)

server.get('/', (req, res) => {
  res.json({ message: 'The API Server is live!' })
})

module.exports = server