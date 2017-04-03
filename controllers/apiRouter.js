'use strict'
const express = require('express')
const router = express.Router()
const query = require('./apiQuery')
const validator = require('./middleware/validator')

// ============ EXAMPLE ================
router.get('/test', validator(), (req, res) => {
  console.log(req.message)
  res.json({ message: req.message })
  // query.test().then((results) => {
  //   res.json(results)
  // })
})

/** ========== Routes Related to User ============
 *  GET /user --> gets all users
 *  GET /user/:id --> gets a specified user based on their id
 *  POST /user --> makes a new user
 *  TODO  .... PUT /user/:id --> TO DO
 */
router.get('/user', (req, res) => {
  query.findUser().then((users) => {
    res.json(users)
  })
})

router.get('/user/:id', (req, res) => {
  query.findUser(req.params.id).then((user) => {
    res.json(user)
  })
})

router.post('/user',
  validator(['username', 'password'], true),
  (req, res) => {
    query.addUser(req.body).spread((user, created) => {
      res.json(created)
    })
  }
)

/** =========== Routes Related to Quiz ==========
 * GET /quiz
 * GET /quiz/:id
 * POST /quiz
 *
 */
router.get('/quiz', (req, res) => {
  query.findQuiz().then((result) => {
    res.json(result)
  })
})

router.post('/quiz', (req, res) => {
  query.addQuiz(req.body).spread((user, created) => {
    res.json({user, created})
  })
})

module.exports = router
