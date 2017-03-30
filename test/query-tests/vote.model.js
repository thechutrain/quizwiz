/* global it, describe, before */
// const chai = require('chai')
const assert = require('chai').assert
const expect = require('chai').expect

const db = require('../../models')
const query = require('../../controllers/apiQuery')

const title = `
===============================
Unit Testing the "vote" model
===============================
`

// Testing Objects
let userAdam = { username: 'adam', password: 'pass' }
let userBrian = { username: 'brian', password: 'not_pass' }
let quiz1 = { name: 'first quiz', description: 'this is a description of first quiz' }
let quiz2 = { name: 'second quiz', description: 'this is a description of the second' }
// let vote1 = { quizid: 1, }

describe(title, () => {
  before((done) => {
    db.sequelize.sync({ force: true }).then(() => {
      return Promise.all([
        query.addUser(userAdam),
        query.addQuiz(quiz1)
      ])
    }).then(() => {
      return Promise.all([
        query.addUser(userBrian),
        query.addQuiz(quiz2)
      ])
    }).then(() => {
      done()
    })
  }) // end of the before

  it('should have 2 users and 2 quizzes, proper set up', (done) => {
    Promise.all([
      query.findUser(),
      query.findQuiz()
    ]).then((resultArray) => {
      let firstUser = resultArray[0][0].dataValues
      let secondUser = resultArray[0][1].dataValues
      let firstQuiz = resultArray[1][0].dataValues
      let secondQuiz = resultArray[1][1].dataValues
      try {
        // ?? is there a method to check object are the same??
        assert.equal(firstUser.username, userAdam.username, 'should be the same username for user a')
        assert.equal(firstUser.password, userAdam.password, 'should be the same password for user a')
        assert.equal(secondUser.username, userBrian.username, 'should be the same username for user b')
        assert.equal(secondUser.password, userBrian.password, 'should be the same password for user b')
        assert.equal(firstQuiz.name, quiz1.name, 'should be the same quiz name for quiz 1')
        assert.equal(firstQuiz.description, quiz1.description, 'should be the same description of quiz1')
        assert.equal(secondQuiz.name, quiz2.name, 'should be the same name for quiz 2')
        assert.equal(secondQuiz.description, quiz2.description, 'should be the same description for quiz 2')
        done()
      } catch (e) {
        done(e)
      }
    }) // end of then
  })

  it('should not have any votes in the table', (done) => {
    query.findAllVotes().then((result) => {
      // check that its empty
      try {
        expect(result).to.be.a('array')
        expect(result).to.be.empty
        done()
      } catch (e) {
        done(e)
      }
    })
  })

  it('should be able to enter a single vote in the table', (done) => {
    done()
  })

  it('should not be able to enter the same vote in the table', (done) => {
    done()
  })

  it('should be able to update the vote in the table', (done) => {
    done()
  })
})
