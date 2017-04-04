const db = require('../models')

// validators
// TO DO LATER
// const user_req_fields = ['username'];

module.exports = {
  // ========= User Queries ==========
  /** finds a specific user in the user table
   * @param {number} id - the user id
   */
  findUser: (id) => {
    // return db.user.findOne({ where: { id } })
    return db.user.findOne({
      where: { id },
      include: [
        { model: db.userquiz }
      ]
    })
  },
  /** findAllUsers() - finds all the users in the database
   *
   */
  findAllUsers: () => {
    return db.user.findAll()
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
