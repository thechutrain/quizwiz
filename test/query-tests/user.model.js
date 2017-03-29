const chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;
// const chaiHttp = require('chai-http');
// chai.use(chaiHttp);
// const server = require('../server');

// require the database models
const db = require('../../models');
const query = require('../../controllers/apiQuery');

const title = `
===============================
Unit test on "user" model
===============================`

describe(title, () => {
  before((done)=>{
    db.sequelize.sync({ force: true }).then((result) => {
      done();
    })
  });

  it('should be an emptied user table ... should be an empty array', (done) => {
    query.findUser().then((results) => {
      try {
        expect(results).to.be.a('array');
        expect(results).to.have.lengthOf(0);
        done();
      } catch (e) {
        done(e);
      }
    })
  });

  it('should not return anything if you try to find a Non-existent user', (done) => {
    query.findUser(-99).then((results) => {
      try {
        expect(results).to.be.a('null');
        done();
      } catch(e) {
        done(e)
      }
    })
  });
  
  // var for the next two it's
  let username = 'testing123';
  let password = 'password';
  it('should be able to create a new user', (done) => {
    query.addUser({ username, password }).spread((result, created) => {
      // console.log(`New user??? ${created}`);
      try {
        expect(result).to.have.deep.property('dataValues.username', username);
        expect(result).to.have.deep.property('dataValues.password', password);
        assert.equal(created, true, 'should be true that it was created');
        done();
      } catch(e) {
        done(e);
      }
    })
  });

  it('won\'t create the same user again', (done) => {
    query.addUser({ username, password }).spread((result, created) => {
      // console.log(`New user??? ${created}`);
      try {
        expect(result).to.have.deep.property('dataValues.username', username);
        expect(result).to.have.deep.property('dataValues.password', password);
        assert.equal(created, false, 'should not have created the same user');
        done();
      } catch(e){
        done(e);
      }
    })
  });

  it('should be able to find user by id', (done) => {
    query.findUser(1).then((result) => {
      try {
        expect(result).to.have.deep.property('dataValues.id', 1);
        expect(result).to.have.deep.property('dataValues.username', username);
        expect(result).to.have.deep.property('dataValues.password', password);
        done();
      } catch(e) {
        done(e);
      }
    })
  });
  
})



