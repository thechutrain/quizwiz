'use strict'
/* global it, describe, before */
const chai = require('chai')
let dirtyChai = require('dirty-chai')
const assert = require('chai').assert
const expect = require('chai').expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
chai.use(dirtyChai)
const server = require('../../server/server')

// // require the database models
const models = require('../../server/db/models')
// const query = require('../../server/queryAPI/apiQuery')
const userQuery = require('../../server/queryAPI').userQuery
const userQuizQuery = require('../../server/queryAPI').userQuizQuery
const quizQuery = require('../../server/queryAPI').quizQuery
const voteQuery = require('../../server/queryAPI').voteQuery

const title =
`
===============================
Integration Test '/quiz' routes
===============================
`

const user1 = {
  username: 'Alan',
  password: 'secret'
}
const quiz1 = {
  title: 'US History Testing Quiz',
  description: 'A quiz on the history of the United States',
  madeBy: 1
}

describe(title, () => {
  before(() => {
    return models.sequelize.sync({ force: true })
    .then(() => {
    // 1. Make FIND ALL queries into all tables
      return Promise.all([
        userQuery.findAllUsers(),
        quizQuery.findAllQuizzes(),
        voteQuery.findAllVotes(),
        models.userquiz.findAll({})
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
      return userQuery.createUser(user1)
    }).then((newUserPromise) => {
      assert.isTrue(newUserPromise[1], 'user shoudl be created')
    })
  })

  it('should be an empty list of quizzes @ GET "/quiz/all"', (done) => {
    chai.request(server)
      .get('/api/v2/quiz/all')
      .end((err, res) => {
        expect(err).to.be.null()
        expect(res).to.have.status(200)
        assert.deepEqual(res.body, [])
        // console.log(res.body)
        done()
      })
  })

  it('should be able to make a new quiz @ POST "/quiz/new"', (done) => {
    chai.request(server)
      .post('/api/v2/quiz/new')
      .send(quiz1)
      .end((err, res) => {
        expect(err).to.be.null()
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        assert.isTrue(res.body.created, 'should have created a new quiz')
        expect(res.body.quiz.title).to.equal(quiz1.title)
        expect(res.body.quiz).to.include.keys([
          'id', 'title', 'description', 'madeBy', 'updatedAt', 'createdAt'
        ])
        // console.log(res.body)
        done()
      })
  })

  it('should be able to find the new quiz that was made @ GET "/quiz/id/1"', (done) => {
    chai.request(server)
      .get('/api/v2/quiz/id/1')
      .end((err, res) => {
        expect(err).to.be.null()
        expect(res).to.have.status(200)
        expect(res.body.title).to.equal(quiz1.title)
        expect(res.body).to.include.keys([
          'id', 'title', 'description', 'madeBy', 'updatedAt', 'createdAt'
        ])
        // console.log(res.body)
        done()
      })
  })
})
