const db = require('../db/models')

// ========= User Queries ==========
function findUserByUsername (username) {
  // used for login purpose, which is why password hash not excluded
  return db.user.findOne({
    where: { username }
  })
}

function findUserById (id) {
  return db.user.findOne({
    where: { id },
    attributes: {
      exclude: ['password']
    },
    include: [
      { model: db.userquiz,
        include: [
          { model: db.quiz }
        ]
      },
      { model: db.vote }
    ]
  })
}

function findAllUsers () {
  return db.user.findAll({
    attributes: {
      exclude: ['password']
    },
    include: [
      { model: db.userquiz },
      { model: db.vote }
    ]
  })
}

function newUser (userObj) {
  return db.user.findOrCreate({ where: { username: userObj.username }, defaults: userObj })
}

function takeQuiz (userQuizObj) {
  const { userId, quizId, score } = userQuizObj
  // check that there is a userId && quizId
  return Promise.all([
    findUserById(userId),
    findQuizById(quizId)
  ]).then((resultArray) => {
    const [ user, quiz ] = resultArray
    if (!user && !quiz) {
      // console.log('Error! Need a valid user & quiz')
      return {error: 'Error! Need a valid user & quiz'}
    } else if (!user) {
      // console.log('Error! Need a valid user')
      return {error: 'Error! Need a valid user'}
    } else if (!quiz) {
      // console.log('Error! Need a valid quiz')
      return {error: 'Error! Need a valid quiz'}
    } else {
      return db.userquiz.create({ userId, quizId, score })
    }
  })
}

// ============ Quiz Query ===========
function findQuizById (id) {
  return db.quiz.findOne({
    where: { id },
    include: [
      { model: db.question }
    ]
  })
}

function findAllQuizzes () {
  return db.quiz.findAll({
    include: [
      { model: db.question }
    ]
  })
}

function newQuiz (quizObj) {
  return db.quiz.findOrCreate({ where: { title: quizObj.title }, defaults: quizObj })
  .catch((err) => [{}, false, err])
}

// ================== Question Query =============
function addQuestion (questionObj) {
  const { question, choices, correctAnswer, quizId } = questionObj
  return findQuizById(quizId).then((result) => {
    if (!result) {
      // not a valid quizId
      return {error: 'Not a valid quizId'}
    }
    // check that userId is equal to madeBy
    return db.question.create({ question, choices, correctAnswer, quizId })
  })
}

// ================== UserQuiz Query =============
function findAllQuizzesTaken (searchObj = {}) {
  return Object.keys(searchObj).length === 0
    ? db.userquiz.findAll()
    : db.userquiz.findAll({where: searchObj})
}

// ================== Vote Query =============
function vote (voteObj) {
  return db.vote.findOrCreate({
    where: {
      userId: voteObj.userId,
      quizId: voteObj.quizId
    },
    defaults: voteObj
  }).spread((result, created) => {
    if (created) {
      return { vote: result, created }
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
}

function updateVote (voteObj) {
  /**
   * @return ex. { vote: { stars: 5, quizId: 1, userId: -1 }, updated: false }
   * @return ex. { vote: { stars: 5, quizId: 1, userId: 1 }, updated: true }
   */
  const { quizId, userId } = voteObj
  delete voteObj.quizId
  delete voteObj.userId
  return db.vote.update(voteObj, {
    where: {
      quizId,
      userId
    }
  }).then((result) => {
    voteObj.quizId = quizId
    voteObj.userId = userId
    return result[0] ? { vote: voteObj, updated: true } : { vote: voteObj, updated: false }
  })
}

function findAllVotes () {
  return db.vote.findAll()
}

module.exports = {
  findUserByUsername,
  findUserById,
  findAllUsers,
  newUser,
  takeQuiz,
  findQuizById,
  findAllQuizzes,
  newQuiz,
  addQuestion,
  findAllQuizzesTaken,
  vote,
  updateVote,
  findAllVotes
}
