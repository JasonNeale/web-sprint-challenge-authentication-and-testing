require('dotenv').config()

const server = require('./server.js')

const PORT = process.env.PORT || 5001
server.listen(PORT, () => {
  console.log(`\n[API Server: Listening on port ${PORT}]\n`)
})