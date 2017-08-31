'use strict'
/* global it, describe, before */
const assert = require('chai').assert
const expect = require('chai').expect

const models = require('../../server/db/models')
// const query = require('../../server/queryAPI/apiQuery')
const checkEmptyDatabase = require('../helper').checkEmptyDatabase
const userQuery = require('../../server/queryAPI').userQuery
const quizQuery = require('../../server/queryAPI').quizQuery

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

let invalidQuiz = {
  title: 'not valid',
  description: 'foreign key constraint with madeBy',
  madeBy: -2
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
      // 3. add data into other tables HERE
      return userQuery.createUser(user1)
    })
    .then((queryPromise) => {
      // 4. check that all insertions worked!
      assert.isTrue(queryPromise[1], 'user should be created')
    })
  })

  /** ================== Actual Tests Begin Here ========================
   *
   */
  it('should not be able to find a non-existent quiz', (done) => {
    // done()
    quizQuery.findQuizById(-99).then((rawResult) => {
      let result = JSON.parse(JSON.stringify(rawResult))
      // console.log(result)
      expect(result).to.be.a('null')
      done()
    })
  })

  it('should be able to create a new quiz', (done) => {
    quizQuery.createQuiz(quizTest).then((resultArray) => {
      const [result, created, error] = resultArray
      try {
        let quiz = JSON.parse(JSON.stringify(result))
        expect(quiz).to.include.keys([
          'id', 'title', 'description', 'madeBy', 'createdAt', 'updatedAt'
        ])
        assert.equal(created, true, 'created value should be true')
        expect(error).to.be.a('undefined')
        done()
      } catch (e) {
        done(e)
      }
    })
  })

  it('should not be able to create a quiz with an invalid foreign key of madeby', (done) => {
    quizQuery.createQuiz(invalidQuiz).then((resultArray) => {
      const [result, created, err] = resultArray
      assert.deepEqual(result, {}, 'Error should result in empty obj')
      assert.isFalse(created, 'it should not have created a new quiz with duplic name')
      expect(err.name).to.equal('SequelizeForeignKeyConstraintError')
      // console.log(err)
      done()
    })
  })

  it('should not be able to find the quiz by id', (done) => {
    quizQuery.findQuizById(1).then((rawResult) => {
      let result = JSON.parse(JSON.stringify(rawResult))
      // console.log(result)
      expect(result).to.include.keys([
        'id', 'title', 'description', 'madeBy', 'createdAt', 'updatedAt'
      ])
      done()
    })
  })

}) // ends describe
