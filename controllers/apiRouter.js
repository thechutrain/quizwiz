'use strict';
const express = require('express');
const router = express.Router();
const query = require('./apiController');

// ============ EXAMPLE ================
router.get('/test', (req, res) => {
  // promise-based
  // query.test().then((result) =>{
  //   res.json(result);
  // })

  // cb based
  // query.test(function(result){
  //   res.json(result);
  // })

  // cb based w. anony func
  query.test((result) => { res.json(result) });
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