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
      const [user, created] = resultArray
      res.json({ user, created }) // "user" here includes password hash
    })
  }
)

//  ----------- TO DO -----------
// router.post('/take-quiz', (req, res) => {
//   res.json({'TODO'})
// })

module.exports = router
