'use strict';
const express = require('express');
const router = express.Router();
const query = require('./apiQuery');

// ============ EXAMPLE ================
router.get('/test', (req, res) => {
  query.test().then((results) =>{
    res.json(results);
  })
})

/** ========== Routes Related to User ============
 *  GET /user --> gets all users
 *  GET /user/:id --> gets a specified user based on their id
 * 
 */
router.get('/', (req, res) => {
  res.json({ 'test': true });
});


module.exports = router;