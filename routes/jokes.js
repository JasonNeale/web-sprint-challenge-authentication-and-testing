const axios = require('axios')
const router = require('express').Router()
const restricted = require('../app/http/middleware/restricted') 

router.get('/', restricted, (req, res) => {
  const requestOptions = {
    headers: { 
      accept: 'application/json',
      authentication: localStorage.getItem('token')
    }
  }

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err })
    })
})

module.exports = router
