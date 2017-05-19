'use strict'
const express = require('express')
const router = express.Router()
const query = require('../../queryAPI/apiQuery')
const validator = require('../middleware/validator')

router.post('/new',
  validator(['userId', 'quizId', 'stars']),
  (req, res) => {
    query.vote(req.body).then((result) => {
      res.json(result)
    })
  }
)

router.put('/update',
  validator(['userId', 'quizId', 'stars']),
  (req, res) => {
    query.updateVote(req.body).then((result) => {
      res.json(result)
    })
  }
)

module.exports = router
