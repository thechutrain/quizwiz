'use strict'
const express = require('express')
const router = express.Router()
const validator = require('../middleware/validator')
// Queries here:
const userQuery = require('../../queryAPI/').userQuery
const userQuizQuery = require('../../queryAPI/').userQuizQuery

// =========== USER routes ==================
router.get('/id/:id', (req, res) => {
	userQuery.findUserById(req.params.id).then(user => {
		res.json(user)
	})
})

router.get('/all', (req, res) => {
	userQuery.findAllUsers().then(users => {
		res.json(users)
	})
})

router.post('/new', validator(['username', 'password']), (req, res) => {
	userQuery.createUser(req.body).then(resultArray => {
		const [userRaw, created] = resultArray
		const user = JSON.parse(JSON.stringify(userRaw))
		delete user.password
		res.json({ user, created })
	})
})

router.post(
	'/take-quiz',
	validator(['userId', 'quizId', 'score']),
	(req, res) => {
		// const { userId, quizId, score } = req.body
		userQuizQuery.createUserQuiz(req.body).then(result => {
			res.json(result)
		})
	}
)

module.exports = router
