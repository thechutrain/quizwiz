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

  it('Should be an empty user table', (done) => {
    done()
  })
}) // ends describe
