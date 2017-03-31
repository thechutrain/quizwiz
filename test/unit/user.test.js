/* global it, describe, before */
const assert = require('chai').assert
const expect = require('chai').expect

const models = require('../../models')
const query = require('../../controllers/apiQuery')

const title =
`
===============================
Unit test on "user" model
===============================
`

describe(title, () => {
  before((done) => {
    models.sequelize.sync()
    .then(() => {
      done()
    })
  })

  it('should be able to find the seeded data', (done) => {
    try {
      query.findUser().then((results) => {
        expect(results).to.be.a('array')
        expect(results).to.have.lengthOf(2)
        console.log(results)
        done()
      })
    } catch (e) {
      done(e)
    }
  })

  it('Should be an empty user table', (done) => {
    done()
  })
}) // ends describe
