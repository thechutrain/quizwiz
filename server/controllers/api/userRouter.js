'use strict'
const express = require('express')
const router = express.Router()
const Query = require('../../queryAPI/apiQuery')
const validator = require('../middleware/validator')

// =========== USER routes ==================
router.get('/id/:id', (req, res) => {
  Query.findUserById(req.params.id).then((user) => {
    res.json(user)
  })
})

router.get('/all', (req, res) => {
  Query.findAllUsers().then((users) => {
    res.json(users)
  })
})

router.post('/new',
  validator(['username', 'password']),
  (req, res) => {
    Query.addUser(req.body).then((resultArray) => {
      const [user, created] = resultArray
      res.json({ user, created })
    })
  }
)

// router.post('/take-quiz', (req, res) => {
//   res.json({'TODO'})
// })

module.exports = router
