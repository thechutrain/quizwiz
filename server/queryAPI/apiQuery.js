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
        // .then((result) => {
        //   return { result, created: true }
        // })
        // .catch((err) => {
        //   return {err}
        // })
    }
  })
}

// ============ Quiz Query ===========
function findQuizById (id) {
  return db.quiz.findOne({ where: { id } })
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
  findAllQuizzesTaken,
  vote,
  findAllVotes
}
