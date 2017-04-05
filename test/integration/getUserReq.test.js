'use strict'
/* global it, describe, before */
const chai = require('chai')
const assert = require('chai').assert
const expect = require('chai').expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
// const server = require('../server');

// require the database models
const models = require('../../models')
const query = require('../../controllers/apiQuery')

const title =
`
===============================
Integration Test '/user' routes
===============================
`



describe(title, () => {
  // before(function () {
  //   return new Promise((resolve, reject) => {
  //     models.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', {raw: true}).then(() => {
  //       models.sequelize.sync({ force: true }).then(() => {
  //         resolve()
  //       })
  //     })
  //   })
  // })
  before(function () {
    return models.sequelize.sync({ force: true })
  })

  it('should be an empty database', (done) => {
    query.findAllUsers().then((results) => {
      // console.log('============ RESULTS - users ============')
      // console.log(results)
      assert.deepEqual(results, [])
      return query.findQuizzesTaken()
    }).then((results) => {
      // console.log('============ RESULTS - quiz taken ============')
      // console.log(results)
      assert.deepEqual(results, [])
      return query.findQuiz()
    }).then((results) => {
      // console.log('============ RESULTS - quizzes made ============')
      // console.log(results)
      assert.deepEqual(results, [])
      done()
    })
  })

})
