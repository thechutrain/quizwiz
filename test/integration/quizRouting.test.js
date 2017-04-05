'use strict'
/* global it, describe, before */
const chai = require('chai')
let dirtyChai = require('dirty-chai')
const assert = require('chai').assert
const expect = require('chai').expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
chai.use(dirtyChai)
const server = require('../../server')

// require the database models
const models = require('../../models')
const query = require('../../controllers/apiQuery')

const title =
`
===============================
Integration Test '/quiz' routes
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
      assert.deepEqual(results, [])
      return query.findQuizzesTaken()
    }).then((results) => {
      assert.deepEqual(results, [])
      return query.findAllQuizzes()
    }).then((results) => {
      assert.deepEqual(results, [])
      // done()
      return query.findAllVotes()
    }).then((results) => {
      assert.deepEqual(results, [])
      done()
    })
  })

  it('should be an empty list of quizzes @ GET "/api/quiz"', (done) => {
    chai.request(server)
      .get('/api/quiz')
      .end((err, res) => {
        expect(err).to.be.null()
        expect(res).to.have.status(200)
        assert.deepEqual(res.body, [])
        done()
      })
  })

  it('should be able to post a new quiz @ POST "/api/quiz"', (done) => {
    let newQuiz = {
      title: 'quizwiz',
      description: 'a testing quiz from chaiHTTP',
      madeBy: 1
    }
    chai.request(server)
      .post('/api/quiz')
      .send(newQuiz)
      .end((err, res) => {
        expect(err).to.be.null()
        expect(res).to.have.status(200)
        console.log(res.body)
        done()
      })
  })

  it('should be able to make another quiz @ POST "/api/quiz"', (done) => {
    done()
  })

  // it('should not be able to another quiz with the same title @ POST "/api/quiz"', (done) => {
  //   done()
  // })

  it('should be able to get the all the quizzes @ GET "/api/quiz"', (done) => {
    done()
  })

  it('should be able to get a specific quiz by id @ GET "/api/quiz/:id"', (done) => {
    done()
  })
})
