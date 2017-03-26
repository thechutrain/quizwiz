'use strict'
const express = require('express')
const router = express.Router()
const query = require('./apiQuery')

// ============ EXAMPLE ================
router.get('/test', (req, res) => {
  query.test().then((results) =>{
    res.json(results)
  })
})

/** ========== Routes Related to User ============
 *  GET /user --> gets all users
 *  GET /user/:id --> gets a specified user based on their id
 *  POST /user --> makes a new user
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

router.post('/user', (req, res) => {
  // TO DO: VALIDATOR 
  query.addUser(req.body).spread((user, created) => {
    res.json(created);
  })
})

module.exports = router