const db = require('../db/models')

module.exports = {
	findQuizById,
	findAllQuizzes,
	createQuiz // change name to newQuiz
}

// ============ Quiz Query ===========
// - findUserByUsername()
// - findUserById()
// - findAllUsers()
// - newUser()

/** findUserByUsername()
*
*/
function findQuizById(id) {
	return db.quiz.findOne({
		where: { id },
		include: [{ model: db.question }]
	})
}

function findAllQuizzes() {
	return db.quiz.findAll({
		include: [{ model: db.question }]
	})
}

function createQuiz(quizObj) {
	return db.quiz
		.findOrCreate({ where: { title: quizObj.title }, defaults: quizObj })
		.catch(err => [{}, false, err])
}
