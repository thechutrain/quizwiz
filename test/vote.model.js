const chai = require('chai')
const assert = require('chai').assert
const expect = require('chai').expect

const db = require('../models')
const query = require('../controllers/apiQuery')

// const title = `
// ===============================
// Unit Testing the "vote" model
// ===============================`

// describe(title, () => {
//   before((done) => {
//     db.sequelize.sync({ force: true }).then(()=> {
//     //   return Promise.all([
//     //     query.addUser({ username: 'adam', password: 'pass' }),
//     //     query.addQuiz({ name: 'test123' })
//     //   ])
//     // }).then((user, quiz )=> {
//     //   console.log(user);
//     //   console.log('----------');
//     //   console.log(quiz);
//     //   done();
//     })
//     return query.addQuiz({ name: 'motherfuckingquiz' });
//   }) // end of the before

//   it('there should be a user and quiz', (done) => {
//     try {
//       done();
//       // Promise.all([
//       //   query.findUser(),
//       //   query.findQuiz()
//       // ]).then((user, quiz) => {
//       //   // console.log(user[0]);
//       //   // console.log('----------');
//       //   // console.log(quiz[0]);
//       //   done();
//       // })
//     } catch(e) {
//       done(e)
//     }
//   });

//   // it('should be an emptied quiz table', (done) => {
//   //   query.findQuiz().then((results) => {
//   //     try {
//   //       expect(results).to.be.a('array')
//   //       expect(results).to.have.lengthOf(0)
//   //       done()
//   //     } catch(e) {
//   //       done(e)
//   //     }
//   //   })
//   // }) // end emptied quiz table

// })