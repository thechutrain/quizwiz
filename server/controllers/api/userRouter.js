'use strict'
const express = require('express')
const router = express.Router()
const query = require('../../queryAPI/apiQuery')
const validator = require('../middleware/validator')

// =========== USER routes ==================
router.get('/id/:id', (req, res) => {
  query.findUserById(req.params.id).then((user) => {
    res.json(user)
  })
})

router.get('/all', (req, res) => {
  query.findAllUsers().then((users) => {
    res.json(users)
  })
})

router.post('/new',
  validator(['username', 'password']),
  (req, res) => {
    query.newUser(req.body).then((resultArray) => {
      const [userRaw, created] = resultArray
      const user = JSON.parse(JSON.stringify(userRaw))
      delete user.password
      res.json({ user, created })
    })
  }
)

router.post('/take-quiz',
  validator(['userId', 'quizId', 'score']),
  (req, res) => {
    // const { userId, quizId, score } = req.body
    query.takeQuiz(req.body).then((result) => {
      res.json(result)
    })
  }
)

module.exports = router
