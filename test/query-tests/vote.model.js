const chai = require('chai')
const assert = require('chai').assert
const expect = require('chai').expect

const db = require('../../models')
const query = require('../../controllers/apiQuery')

const title = `
===============================
Unit Testing the "vote" model
===============================
`

describe(title, () => {
  let user_a = { username: 'adam', password: 'pass' };
  let user_b = { username: 'brian', password: 'not_pass' };
  let quiz_1 = { name: 'first quiz', description: 'this is a description of first quiz' };
  let quiz_2 = { name: 'second quiz', description: 'this is a description of the second' };
  before((done) => {
    db.sequelize.sync({ force: true }).then(()=> {
      return Promise.all([
        query.addUser(user_a),
        query.addQuiz(quiz_1),
      ])
    }).then(() => {
      return Promise.all([
        query.addUser(user_b),
        query.addQuiz(quiz_2)
      ])
    }).then(() => {
      done();
    });
  }); // end of the before

  it('should have 2 users and 2 quizzes, proper set up', (done) => {
    Promise.all([
      query.findUser(),
      query.findQuiz()
    ]).then((resultArray) => {
      let first_user = resultArray[0][0].dataValues;
      let second_user = resultArray[0][1].dataValues;
      let first_quiz = resultArray[1][0].dataValues;
      let second_quiz = resultArray[1][1].dataValues;
      try {
        // ?? is there a method to check object are the same??
        assert.equal(first_user.username, user_a.username, 'should be the same username for user a');
        assert.equal(first_user.password, user_a.password, 'should be the same password for user a');
        assert.equal(second_user.username, user_b.username, 'should be the same username for user b');
        assert.equal(second_user.password, user_b.password, 'should be the same password for user b');
        assert.equal(first_quiz.name, quiz_1.name, 'should be the same quiz name for quiz 1');
        assert.equal(first_quiz.description, quiz_1.description, 'should be the same description of quiz1');
        done();
      } catch(e) {
        done(e);
      }
    }) // end of then
  });

  it('should not have any votes in the table', (done) => {
    query.findAllVotes().then((result) => {
      // check that its empty
      try {
        expect(result).to.be.a('array');
        done();  
      } catch(e) {
        done(e);
      }
    })
  });

  it('should be able to enter a single vote in the table', (done) => {
    done();
  });

  it('should not be able to enter the same vote in the table', (done) => {
    done();
  });

  it('should be able to update the vote in the table', (done) => {
    done();
  })



})