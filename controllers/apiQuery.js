const db = require('../models');

// validators
// TO DO LATER
// const user_req_fields = ['username'];

module.exports = {
  // User Related Queries
  findUser: (id) => (id ? db.user.findOne({ where: { id }}) : db.user.findAll()),
  addUser: (userObj) => {
    return db.user.findOrCreate({ where: { username: userObj.username }, defaults: userObj });
  },

  // Quiz related queries
  findQuiz: (id) => (id ? db.quiz.findOne({ where: { id }}) : db.quiz.findAll()),
  addQuiz: (quizObj) => {
    return db.quiz.findOrCreate({ where: { name: quizObj.name }, defaults: quizObj });
  }, 

  // Vote related queries
  vote: (voteObj) => {
    // first find if user_id + quiz_id pair exists
    db.vote.find({ where: { user_id: voteObj.user_id, quiz_id: voteObj.quiz_id } })
    .then((result) => {
      return result;
    })
    // 
  }
}