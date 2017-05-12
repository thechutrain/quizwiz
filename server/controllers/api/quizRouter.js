'use strict'
const express = require('express')
const router = express.Router()
const query = require('../../queryAPI/apiQuery')
const validator = require('../middleware/validator')

// =========== QUIZ routes ==================
router.get('/id/:id', (req, res) => {
  query.findQuizById(req.params.id).then((quiz) => {
    res.json(quiz)
  })
})

router.get('/all', (req, res) => {
  query.findAllQuizzes().then((quizzes) => {
    res.json(quizzes)
  })
})

/**
 * signed in users only.
 */
router.post('/new',
  validator(['title', {key: 'description', optional: true}, 'madeBy']),
  (req, res) => {
    query.newQuiz(req.body).then((resultArray) => {
      const [quiz, created] = resultArray
      res.json({ quiz, created })
    })
  }
)
module.exports = router
