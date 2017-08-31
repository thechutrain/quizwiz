const assert = require('chai').assert

// other models etc.
const models = require('../server/db/models')
const userQuery = require('../server/queryAPI').userQuery
const userQuizQuery = require('../server/queryAPI').userQuizQuery
const quizQuery = require('../server/queryAPI').quizQuery
const voteQuery = require('../server/queryAPI').voteQuery

module.exports = {
  checkEmptyDatabase
}

function checkEmptyDatabase() {
  // 1. Make FIND ALL queries into all tables
  return Promise.all([
    userQuery.findAllUsers(),
    quizQuery.findAllQuizzes(),
    voteQuery.findAllVotes(),
    models.userquiz.findAll({})
  ]).then((promiseArray) => {
    // 2. check all queries to see if they are empty []
    promiseArray.forEach((searchResult) => {
      assert.deepEqual(searchResult, [])
    })
  })
}

