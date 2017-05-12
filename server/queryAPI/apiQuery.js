const db = require('../db/models')

module.exports = {
  /** ========= User Queries ==========
   *
   */
  findUserByUsername: (username) => {
    // used for login purpose, which is why password hash not excluded
    return db.user.findOne({
      where: { username }
    })
  },
  // @return - null, if none found. User object if found.
  findUserById: (id) => {
    return db.user.findOne({
      where: { id },
      attributes: {
        exclude: ['password']
      },
      include: [
        { model: db.userquiz },
        { model: db.vote }
      ]
    })
  },
  // @return [], either empty or of all users as obj.
  findAllUsers: () => {
    return db.user.findAll({
      attributes: {
        exclude: ['password']
      },
      include: [
        { model: db.userquiz },
        { model: db.vote }
      ]
    })
  },
  newUser: (userObj) => {
    return db.user.findOrCreate({ where: { username: userObj.username }, defaults: userObj })
  },

  /**  ========== Quiz Queries ==========
   *
   */
  findQuizById: (id) => (db.quiz.findOne({ where: { id } })),
  findAllQuizzes: () => {
    return db.quiz.findAll({
      include: [
        { model: db.question }
      ]
    })
  },
  newQuiz: (quizObj) => {
    return db.quiz.findOrCreate({ where: { title: quizObj.title }, defaults: quizObj })
    .catch((err) => [{}, false, err])
  },

  /** ========== UserQuiz Queries ==========
   *
   */
  takeQuiz: (dataObj) => {
    return db.userquiz.create(dataObj)
  }, // ends takeQUiz

  findAllQuizzesTaken: (searchObj = {}) => {
    return Object.keys(searchObj).length === 0
      ? db.userquiz.findAll()
      : db.userquiz.findAll({where: searchObj})
  },

  /** ========== Vote related queries ==========
   *
   */
  /**
   * @param {obj} voteObj - an object containing userId, quizId, stars etc.
   * @return { result, created } -
   */
  vote: (voteObj) => {
    return db.vote.findOrCreate({
      where: {
        userId: voteObj.userId,
        quizId: voteObj.quizId
      },
      defaults: voteObj
    }).spread((result, created) => {
      if (created) {
        return [result, created]
      } else {
        return db.vote.update(
          {
            stars: voteObj.stars
          },
          {
            where: {
              userId: voteObj.userId,
              quizId: voteObj.quizId
            }
          }
        ).then((result) => {
          if (result[0] === 1) {
            return db.vote.find({
              where: {
                userId: voteObj.userId,
                quizId: voteObj.quizId
              }
            }).then((update) => {
              return [update.dataValues, created]
            })
          } else {
            return [{ error: true, msg: 'failed to update vote' }, created]
          }
        })
      }
    })
    .catch((err) => {
      // Catch foreign constraint errors
      console.log(`ERROR in making vote ${err}`)
      return [{ error: true, msg: err }, false]
    })
  },

  findAllVotes: () => {
    return db.vote.findAll()
  }
}
