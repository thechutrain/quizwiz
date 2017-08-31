// import all the queries based around the tables they will control
const userQuery = require('./userQuery')
const userQuizQuery = require('./userQuizQuery')
const quizQuery = require('./quizQuery')

module.exports = {
	userQuery,
	userQuizQuery,
	quizQuery
}
