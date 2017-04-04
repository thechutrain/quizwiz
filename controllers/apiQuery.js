const db = require('../models')

// validators
// TO DO LATER
// const user_req_fields = ['username'];

module.exports = {
  // ====== User Queries ==========
  findUser: (id) => {
    if (id) {
      return db.user.findOne({ where: { id } })
    } else {
      return db.user.findAll()
    }
  },
  addUser: (userObj) => {
    return db.user.findOrCreate({ where: { username: userObj.username }, defaults: userObj })
  },

  // ====== Quiz Queries ==========
  findQuiz: (id) => (id ? db.quiz.findOne({ where: { id } }) : db.quiz.findAll()),
  makeQuiz: (quizObj) => {
    return db.quiz.findOrCreate({ where: { name: quizObj.name }, defaults: quizObj })
  },

  // ====== UserQuiz Queries ==========
  takeQuiz: (dataObj) => {
    return db.userquiz.create(dataObj)
  }, // ends takeQUiz

  findQuizzesTaken: (userId) => {
    // TO DO optional optParams
    return userId
      ? db.userquiz.findAll({where: { userId }})
      : db.userquiz.findAll()
  },
  // Vote related queries
  vote: (voteObj) => {
    return db.vote.findOrCreate({
      where: {
        userId: voteObj.userId,
        quizId: voteObj.quizId
      },
      defaults: voteObj
    })
  },
  findAllVotes: () => {
    // TO DO find votes by a quiz id
    return db.vote.findAll()
  }
}
