// 'use strict'
// /* global it, describe, before */
// const assert = require('chai').assert
// const expect = require('chai').expect

// const models = require('../../server/db/models')
// const query = require('../../server/queryAPI/apiQuery')

// const title =
// `
// ===============================
// Unit test on "vote" model
// ===============================
// `

// describe(title, () => {
//   // before(function () {
//   //   return new Promise((resolve, reject) => {
//   //     models.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', {raw: true}).then(() => {
//   //       models.sequelize.sync({ force: true }).then(() => {
//   //         resolve()
//   //       })
//   //     })
//   //   })
//   // })
//   before(() => {
//     return models.sequelize.sync({ force: true })
//   })

//   it('Should be an empty user, quiz, vote, userquiz table', (done) => {
//     Promise.all([
//       query.findAllUsers(),
//       query.findAllQuizzes(),
//       query.findAllVotes(),
//       query.findQuizzesTaken()
//     ])
//     .then((promiseArray) => {
//       // DEBUGGING
//       // console.log('Users', promiseArray[0])
//       // console.log('Quizzes', promiseArray[1])
//       // console.log('Votes', promiseArray[2])
//       // console.log('Quizzes Taken', promiseArray[3])
//       promiseArray.forEach((promise) => {
//         assert.deepEqual(promise, [])
//       })
//       done()
//     })
//   })

//   // it('should be an empty vote table', (done) => {
//   //   query.findAllVotes().then((results) => {
//   //     try {
//   //       assert.deepEqual(results, [])
//   //       done()
//   //     } catch (e) {
//   //       done(e)
//   //     }
//   //   })
//   // })

//   it('should not be able to make a new vote without a valid user and quiz id', (done) => {
//     let testVote = {
//       userId: 1,
//       quizId: 2,
//       stars: 5
//     }
//     query.vote(testVote).spread((result, created) => {
//       // console.log(result)
//       // console.log(created)
//       assert.isFalse(created, 'vote should not have been created')
//       // assert.isTrue(created, 'vote should be created')
//       // console.log(result.dataValues)
//       done()
//     })
//   })

//   it('should be able to update the previous vote', (done) => {
//     let testVote = {
//       userId: 1,
//       quizId: 2,
//       stars: 0
//     }
//     query.vote(testVote).spread((result, created) => {
//       assert.isFalse(created, 'vote should not have been created')
//       // console.log(result)
//       done()
//     })
//   })

//   it('should not be able to update vote with bad params', (done) => {
//     let badVote = {
//       userId: 1,
//       quizId: 2,
//       error: 'duhhh'
//     }
//     query.vote(badVote).spread((result, created) => {
//       expect(result).to.have.any.keys('error')
//       assert.isFalse(created, 'vote should not have been created')
//       done()
//     })
//   })
// }) // ends describe
