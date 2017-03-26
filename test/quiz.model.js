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
        expect(results).to.be.a('array');
        expect(results).to.have.lengthOf(0);
        done();
      } catch(e) {
        done(e);
      }
    })
  }) // end emptied quiz table

  it('should not return anything if you try to find a Non-existent user', (done) => {
    query.findQuiz(-99).then((results) => {
      try {
        expect(results).to.be.a('null');
        done();
      } catch(e) {
        done(e)
      }
    })
  });

  // QUIZ DATA
  var name = 'testing quiz 123';
  var description = 'this is a description of testing 123';

  it('should be able to insert a new quiz', (done) => {
    query.addQuiz({ name, description }).spread((result, created) => {
      // console.log(`New quiz??? ${created}`);
      // console.log(result);
      try {
        expect(result).to.have.deep.property('dataValues.name', name);
        expect(result).to.have.deep.property('dataValues.description', description);
        assert.equal(created, true, 'should be true that it was created');
        done();
      } catch(e) {
        done(e)
      }
    })
  }) // closes it

  it('won\'t create the same user again', (done) => {
    query.addQuiz({ name, description }).spread((result, created) => {
      // console.log(`New user??? ${created}`);
      try {
        expect(result).to.have.deep.property('dataValues.name', name);
        expect(result).to.have.deep.property('dataValues.description', description);
        assert.equal(created, false, 'should be true that it was created');
        done();
      } catch(e){
        done(e);
      }
    })
  });

  it('should be able to find the new quiz', (done) => {
    query.findQuiz(1).then((result) => {
      try {
        expect(result).to.have.deep.property('dataValues.id', 1);
        done();
      } catch(e) {
        done(e)
      }
    })
  })

})