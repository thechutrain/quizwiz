'use strict'
const express = require('express')
const router = express.Router()
const validator = require('../middleware/validator')
// QUeries here:
const quizQuery = require('../../queryAPI/').quizQuery
const questionQuery = require('../../queryAPI/').questionQuery

// =========== QUIZ routes ==================
router.get('/id/:id', (req, res) => {
	quizQuery.findQuizById(req.params.id).then(quiz => {
		res.json(quiz)
	})
})

router.get('/all', (req, res) => {
	quizQuery.findAllQuizzes().then(quizzes => {
		res.json(quizzes)
	})
})

/**
 * signed in users only.
 */
router.post(
	'/new',
	validator(['title', { key: 'description', optional: true }, 'madeBy']),
	(req, res) => {
		quizQuery.createQuiz(req.body).then(resultArray => {
			const [quiz, created] = resultArray
			res.json({ quiz, created })
		})
	}
)

// =========== Question routes ==================
router.post('/:quizId/question/new',
	validator(['question', 'choices', 'correctAnswer']),
	(req, res) => {
		console.log(req.params.quizId)
		const { question, correctAnswer, choices } = req.body
		questionQuery
			.createQuestion({
				quizId: req.params.quizId,
				question,
				correctAnswer,
				choices
			})
			.then(result => {
				// console.log(result)
				res.json(result)
			})
			.catch(error => {
				console.log('ERROR!!!')
				console.log(error)
				res.json(error)
			})
	})

// TODO - will do later ...
router.put('/:quizId/question/update', (req, res) => {
	res.json({ msg: 'TODO ' })
})

module.exports = router
