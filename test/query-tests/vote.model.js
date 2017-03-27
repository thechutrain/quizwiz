const chai = require('chai')
const assert = require('chai').assert
const expect = require('chai').expect

const db = require('../../models')
const query = require('../../controllers/apiQuery')

const title = `
===============================
Unit Testing the "vote" model
===============================`;

describe(title, () => {
  let user_a = { username: 'adam', password: 'pass' };
  let user_b = { username: 'brian', password: 'not_pass' };
  let quiz_1 = { name: 'first quiz', description: 'this is a description of first quiz' };
  let quiz_2 = { name: 'second quiz', description: 'this is a description of the second' };
  before((done) => {
    db.sequelize.sync({ force: true }).then(()=> {
      return Promise.all([
        query.addUser(user_a),
        query.addUser(user_b),
        query.addQuiz(quiz_1),
        query.addQuiz(quiz_2)
      ])
    }).then(() => {
    // .spread(([user, u_created], [quiz, q_created]) => {
      // console.log(`Was the user created?? ${u_created}`);
      // console.log(`Was the quiz created?? ${q_created}`);
      done();
    });
  }); // end of the before

  it('should have a user and a quiz, proper set up', (done) => {
    Promise.all([
      query.findUser(),
      query.findQuiz()
    ]).then((resultArray) => {
      let first_user = resultArray[0][0].dataValues;
      let second_user = resultArray[0][1].dataValues;
      let first_quiz = resultArray[1][0].dataValues;
      let second_quiz = resultArray[1][1].dataValues;
      try {
        assert.equal(first_user, user_a, 'should be the same user');
        done();
      } catch(e) {
        done(e);
      }
    })

    // return Promise.all([
    //   query.findUser(),
    //   query.findQuiz()
    // ]).then(([user, quiz]) => {
    //   try {
    //     console.log(user);
    //     console.log(quiz);
    //     done();
    //   } catch(e) {
    //     done(e)
    //   }
    // })
  });


})