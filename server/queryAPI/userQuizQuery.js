const db = require('../db/models')
// other dependent queries
const findUserById = require('./userQuery').findUserById
const findQuizById = require('./quizQuery').findQuizById

module.exports = {
	createUserQuiz
}

/** takeQuiz()
* @param userQuizObj {Object} - has 3 keys: userId, quizId, score
*/
function createUserQuiz(userQuizObj) {
	const { userId, quizId, score } = userQuizObj
	// check that there is a userId && quizId
	return Promise.all([findUserById(userId), findQuizById(quizId)])
		.then(resultArray => {
			const [user, quiz] = resultArray
			if (!user && !quiz) {
				return { error: 'Error! Need a valid user & quiz' }
			} else if (!user) {
				return { error: 'Error! Need a valid user' }
			} else if (!quiz) {
				return { error: 'Error! Need a valid quiz' }
			} else {
				return db.userquiz.create({ userId, quizId, score })
			}
		})
		.catch(err => {
			console.log(err)
			return err
		})
}
