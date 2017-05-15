'use strict'
/* global it, describe, before */
const assert = require('chai').assert
const expect = require('chai').expect

const models = require('../../server/db/models')
const query = require('../../server/queryAPI/apiQuery')

const title =
`
===============================
Unit test on "vote" model
===============================
`

const quiz1 = {
  title: 'US History Testing Quiz',
  description: 'A quiz on the history of the United States',
  madeBy: 1
}

const user1 = {
  username: 'I_am_a_test',
  password: 'incorrect'
}

const validVote = {
  userId: 1,
  quizId: 1,
  stars: 3
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
        query.newUser(user1)
      ])
    })
    .then((insertPromises) => {
      // 4. check that all insertions worked!
      assert.isTrue(insertPromises[0][1], 'user should be created')
      // assert.isTrue(insertPromises[1][1], 'quiz should be created')
      return query.newQuiz(quiz1)
    })
    .then((insertPromise) => {
      assert.isTrue(insertPromise[0][1], 'quiz should be created')
    })
  })
    /** ================== Actual Tests Begin Here ========================
   *
   */
  // it('should be able to find all the votes', (done) => {
  //   query.findAllVotes().then((results) => {
  //     // console.log(results)

  //     done()
  //   })
  // })

  it('should be able to make a vote', (done) => {
    query.vote(validVote).then((rawResult) => {
      const result = JSON.parse(JSON.stringify(rawResult))
      // console.log(JSON.parse(JSON.stringify(result)))
      // console.log(result)
      expect(result.vote).to.include.keys([
        'userId', 'quizId', 'stars'
      ])
      expect(result.vote.stars).to.equal(3)
      assert.isTrue(result.created)
      done()
    })
  })

  it('should be able to update a previously entered quiz', (done) => {
    query.updateVote({
      quizId: 1,
      userId: 1,
      stars: 5
    }).then((result) => {
      // console.log(result)
      // console.log(JSON.parse(JSON.stringify(result)))
      // assert.isTrue(result.updated)
      expect(result.updated).to.be.true()
      done()
    })
  })

  it('should NOT be able to make a vote with invalid userId', (done) => {
    query.updateVote({
      quizId: 1,
      userId: -1,
      stars: 5
    }).then((result) => {
      // console.log(result)
      // console.log(result.updated)
      // console.log(JSON.parse(JSON.stringify(result)))
      // assert.isNotTrue(result.updated)
      // assert.isTrue(result.updated)
      // assert.isTrue(false) // NOT WORKING???
      expect(result.updated).to.be.false()
      done()
    })
  })

  it('should NOT be able to make a vote with invalid quizId', (done) => {
    query.updateVote({
      quizId: -1,
      userId: 1,
      stars: 5
    }).then((result) => {
      expect(result.updated).to.be.false()
      done()
    })
  })
})
