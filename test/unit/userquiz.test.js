'use strict'
/* global it, describe, before */
const assert = require('chai').assert
const expect = require('chai').expect

const models = require('../../server/db/models')
// const query = require('../../server/queryAPI/apiQuery')
const checkEmptyDatabase = require('../helper').checkEmptyDatabase
const userQuery = require('../../server/queryAPI').userQuery
const quizQuery = require('../../server/queryAPI').quizQuery
const userQuizQuery = require('../../server/queryAPI').userQuizQuery

const title =
`
===============================
Unit test on "user quiz" model
===============================
`

let quiz1 = {
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
      checkEmptyDatabase()
    })
    .then(() => {
      return userQuery.createUser(user1)
    })
    .then((insertPromises) => {
      // 4. check that all insertions worked!
      assert.isTrue(insertPromises[1], 'user should be created')
      // assert.isTrue(insertPromises[1][1], 'quiz should be created')
      return quizQuery.createQuiz(quiz1)
    })
    .then((insertPromise) => {
      assert.isTrue(insertPromise[1], 'quiz should be created')
    })
  })

  /** ================== Actual Tests Begin Here ========================
   *
   */
  it('should be able to enter a valid quiz', (done) => {
    userQuizQuery.createUserQuiz({
      userId: 1,
      quizId: 1,
      score: 5
    }).then((rawResult) => {
      const result = JSON.parse(JSON.stringify(rawResult))
      // console.log(result)
      // console.log('========')
      expect(result.id).to.equal(1)
      expect(result).to.include.keys([
        'id', 'userId', 'quizId', 'score', 'updatedAt', 'createdAt'
      ])
      done()
    })
  })

  it('should be able to take the quiz again', (done) => {
    userQuizQuery.createUserQuiz({
      userId: 1,
      quizId: 1,
      score: 5
    }).then((rawResult) => {
      const result = JSON.parse(JSON.stringify(rawResult))
      expect(result.id).to.equal(2)
      expect(result).to.include.keys([
        'id', 'userId', 'quizId', 'score', 'updatedAt', 'createdAt'
      ])
      done()
    })
  })

  it('should not be able to enter a quiz-taken with invalid user', (done) => {
    userQuizQuery.createUserQuiz({
      userId: -1,
      quizId: 1,
      score: 5
    }).then((rawResult) => {
      const result = JSON.parse(JSON.stringify(rawResult))
      // console.log(result)
      // console.log('========')
      assert.deepEqual(result, {error: 'Error! Need a valid user'}, 'Should not be able to enter quiz without valid user')
      done()
    })
  })

  it('should not be able to enter a quiz-taken with invalid quiz', (done) => {
    userQuizQuery.createUserQuiz({
      userId: 1,
      quizId: -1,
      score: 5
    }).then((rawResult) => {
      const result = JSON.parse(JSON.stringify(rawResult))
      assert.deepEqual(result, {error: 'Error! Need a valid quiz'}, 'Should not be able to enter quiz without valid quiz')
      done()
    })
  })
}) // ends describe
