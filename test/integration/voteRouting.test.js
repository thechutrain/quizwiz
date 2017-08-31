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

// require the database models
const models = require('../../server/db/models')
const checkEmptyDatabase = require('../helper').checkEmptyDatabase
const userQuery = require('../../server/queryAPI').userQuery
const quizQuery = require('../../server/queryAPI').quizQuery

const title =
`
===============================
Integration Test '/vote' routes
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

const vote1 = {
  userId: 1,
  quizId: 1,
  stars: 4
}

const vote2 = {
  userId: 1,
  quizId: 1,
  stars: 0
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
    }).then((newUserPromise) => {
      assert.isTrue(newUserPromise[1], 'user should be created')
    }).then(() => {
      return quizQuery.createQuiz(quiz1)
    }).then((insertPromise) => {
      assert.isTrue(insertPromise[0][1], 'quiz should be created')
    })
  })

  // it('should be able to make a post', (done) => {
  //   // done()
  //   chai.request(server)
  //     .post()
  // })
  it('should be able to find the new post', (done) => {
    chai.request(server)
      .post('/api/v2/vote/new')
      .send(vote1)
      .end((err, res) => {
        expect(err).to.be.null()
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        assert.isTrue(res.body.created, 'should have created a new vote')
        // console.log(res.body.vote)
        expect(res.body.vote.stars).to.equal(vote1.stars)
        done()
      })
  })

  it('should not be able to post without valid post body', (done) => {
    chai.request(server)
      .post('/api/v2/vote/new')
      .send({
        // userId: 1,
        stars: 3
      })
      .end((err, res) => {
        expect(err).to.be.null()
        expect(res).to.have.status(200)
        expect(res.body).to.have.lengthOf(2)
        // CAN check for actual error messages here
        // console.log(res.body)
        // console.log('=============')
        done()
      })
  })

  // it('should be able to find the new vote', (done) => {
  //   done()
  // })

  it('should be able to update the new post', (done) => {
    chai.request(server)
      .put('/api/v2/vote/update')
      .send(vote2)
      .end((err, res) => {
        expect(err).to.be.null()
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        expect(res.body.updated).to.be.true()
        expect(res.body.vote.stars).to.equal(vote2.stars)
        // console.log(res.body)
        // console.log('=============')
        done()
      })
  })
})
