const chai = require('chai')
const assert = require('chai').assert
const expect = require('chai').expect

const db = require('../models')
const query = require('../controllers/apiQuery')

const title = `
===============================
Unit Testing the "quiz" model
===============================`

describe(title, () => {
  before((done) => {
    db.sequelize.sync({ force: true }).then((result)=> {
      done();
    })
  }) // end of the before

  it('should be an emptied quiz table', (done) => {
    query.findQuiz().then((results) => {
      try {
        expect(results).to.be.a('array')
        expect(results).to.have.lengthOf(0)
        done()
      } catch(e) {
        done(e)
      }
    })
  }) // end emptied quiz table

})