'use strict'
/* global it, describe, before */
const assert = require('chai').assert
const expect = require('chai').expect

const models = require('../../server/db/models')
const checkEmptyDatabase = require('../helper').checkEmptyDatabase
const userQuery = require('../../server/queryAPI').userQuery

const title =
`
===============================
Unit test on "user" model
===============================
`
// testing variables

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
  })

  it('Should not return a non-existent user', (done) => {
    userQuery.findUserById(-99).then((results) => {
      expect(results).to.be.a('null')
      done()
    })
  })

  it('should be able to create a new user', (done) => {
    userQuery.createUser(user1).spread((result, created) => {
      try {
        assert.isTrue(created, 'user was created')
        done()
      } catch (e) {
        done(e)
      }
    })
  })

  it('should not be able to create the same user twice', (done) => {
    userQuery.createUser(user1).spread((result, created) => {
      try {
        assert.isNotTrue(created, 'duplicate use should not have been created again')
        done()
      } catch (e) {
        done(e)
      }
    })
  })

  it('should be able to find the user that was created', (done) => {
    userQuery.findUserById(1).then((result) => {
      try {
        let user = JSON.parse(JSON.stringify(result))
        // let user = result.dataValues
        // console.log(user)
        assert.property(user, 'id', '1', 'user should have an id of one')
        assert.property(user, 'username', user1.username, 'user should have an id of one')
        done()
      } catch (e) {
        done(e)
      }
    })
  })

  it('should be able to check the hash password correctly', (done) => {
    userQuery.findUserByUsername(user1.username)
    .then((userResult) => {
      const incorrectPass = userResult.comparePassword('wrong password')
      const correctPass = userResult.comparePassword(user1.password)
      assert.isFalse(incorrectPass, 'should be the incorrect password')
      assert.isTrue(correctPass, 'should be the correct password')
      // console.log('Wrong', incorrectPass)
      // console.log('Right', correctPass)
      done()
    })
  })

  // it('should be able to find all users', (done) => {
  //   query.findAllUsers().then((rawResults) => {
  //     let results = JSON.parse(JSON.stringify(rawResults)) // hack!
  //     console.log(results)
  //     done()
  //   })
  // })
}) // ends describe
