const chai = require('chai')
const assert = require('chai').assert
const expect = require('chai').expect

const db = require('../models')
const query = require('../controllers/apiQuery')

const title = `
===============================
Unit Testing the "vote" model
===============================`;

describe(title, () => {
  before((done) => {
    // WORKING WAY
    // db.sequelize.sync({ force: true }).then(()=> {
    //   return query.addUser({ username: 'adam', password: 'pass' });
    // }).then(() => {
    //   return query.addQuiz({ name: 'test123' })
    // }).then(() => {
    //   done();
    // })

    db.sequelize.sync({ force: true }).then(()=> {
      return Promise.all([
        query.addUser({ username: 'adam', password: 'pass' }),
        query.addQuiz({ name: 'test123' })
      ])
    }).spread(([user, u_created], [quiz, q_created]) => {
      // console.log(`Was the user created?? ${u_created}`);
      // console.log(`Was the quiz created?? ${q_created}`);
      done();
    })
  }) // end of the before

  it('should have a user and a quiz, proper set up', (done) => {
    Promise.all([
      query.findUser(),
      query.findQuiz()
    ]).then((user, quiz) => {
      try {
        // console.log(user)
        done();
      } catch(e) {
        done(e)
      }
    })
  });
  // it('there should be a user and quiz', (done) => {
  //   try {
  //     done();
  //     // Promise.all([
  //     //   query.findUser(),
  //     //   query.findQuiz()
  //     // ]).then((user, quiz) => {
  //     //   // console.log(user[0]);
  //     //   // console.log('----------');
  //     //   // console.log(quiz[0]);
  //     //   done();
  //     // })
  //   } catch(e) {
  //     done(e)
  //   }
  // });

  // it('should be an emptied quiz table', (done) => {
  //   query.findQuiz().then((results) => {
  //     try {
  //       expect(results).to.be.a('array')
  //       expect(results).to.have.lengthOf(0)
  //       done()
  //     } catch(e) {
  //       done(e)
  //     }
  //   })
  // }) // end emptied quiz table

})