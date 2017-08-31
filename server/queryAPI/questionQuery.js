const db = require('../db/models')
const findQuizById = require('./quizQuery').findQuizById

module.exports = {
	createQuestion
}

/**
*
*/
function createQuestion(questionObj) {
	const { question, choices, correctAnswer, quizId } = questionObj
	return findQuizById(quizId).then(result => {
		if (!result) {
			// not a valid quizId
			return { error: 'Not a valid quizId' }
		}
		// check that userId is equal to madeBy
		return db.question.create({ question, choices, correctAnswer, quizId })
	})
}

// TODO - write an update query here
// function updateQuestion(questionObj) {
//   const
// }
