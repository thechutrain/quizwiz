'use strict'
const express = require('express')
const router = express.Router()
const validator = require('../middleware/validator')
// Query here:
const voteQuery = require('../../queryAPI/').voteQuery

// NOTES - the post & update should almost be combined
// into the same route right?
router.post('/new',
  validator(['userId', 'quizId', 'stars']),
  (req, res) => {
    voteQuery.vote(req.body).then((result) => {
      res.json(result)
    })
  }
)

router.put('/update',
  validator(['userId', 'quizId', 'stars']),
  (req, res) => {
    voteQuery.updateVote(req.body).then((result) => {
      res.json(result)
    })
  }
)

module.exports = router
