'use strict'
/* global it, describe, before */
const assert = require('chai').assert
// const expect = require('chai').expect

const models = require('../../server/db/models')
const query = require('../../server/queryAPI/apiQuery')

const title =
`
===============================
Unit test on "quiz" model
===============================
`

let quizTest = {
  title: 'US History Testing Quiz',
  description: 'A quiz on the history of the United States',
  madeBy: 1
}

let user1 = {
  username: 'I_am_a_test',
  password: 'incorrect'
}

describe(title, () => {
  before(() => {
    return models.sequelize.sync({ force: true })
    .then(() => {
      // 1. Make FIND ALL queries into all tables
      return Promise.all([
        query.findAllUsers(),
        query.findAllQuizzes(),
        query.findAllVotes(),
        query.findAllQuizzesTaken()
      ])
    })
    .then((promiseArray) => {
      // 2. check all queries to see if they are empty []
      promiseArray.forEach((searchResult) => {
        assert.deepEqual(searchResult, [])
      })
    })
    .then(() => {
      // 3. add data into other tables HERE
      return Promise.all([
        query.addUser(user1)
      ])
    })
    .then((insertPromises) => {
      // 4. check that all insertions worked!
      assert.isTrue(insertPromises[0][1], 'user should be created')
    })
  })

  /** ================== Actual Tests Begin Here ========================
   *
   */
  it('should be able to create a new quiz', (done) => {
    query.makeQuiz(quizTest).spread((result, created) => {
      try {
        // let quiz = result.dataValues
        // console.log(quiz)
        assert.equal(created, true, 'created value should be true')
        done()
      } catch (e) {
        done(e)
      }
    })
  })
}) // ends describe
