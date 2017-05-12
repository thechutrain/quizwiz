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

//  ----------- TO DO -----------
// router.post('/take-quiz', (req, res) => {
//   res.json({'TODO'})
// })

module.exports = router
