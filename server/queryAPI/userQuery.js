const db = require('../db/models')

module.exports = {
	findUserByUsername,
	findUserById,
	findAllUsers,
	createUser
}

/** findUserByUsername()
* @param username {string}
*/
function findUserByUsername(username) {
	// used for login purpose, which is why password hash not excluded
	return db.user.findOne({
		where: { username }
	})
}

/**
*
*/
function findUserById(id) {
	return db.user.findOne({
		where: { id },
		attributes: {
			exclude: ['password']
		},
		include: [
			{
				model: db.userquiz,
				include: [{ model: db.quiz }]
			},
			{ model: db.vote }
		]
	})
}

/**
*
*/
function findAllUsers() {
	return db.user.findAll({
		attributes: {
			exclude: ['password']
		},
		include: [{ model: db.userquiz }, { model: db.vote }]
	})
}

/**
*
*/
function createUser(userObj) {
	// clean the userObj
	// UPDATE OTHER PARAMETERS TO THE USER HERE
	// const cleanUserObj = Object.assign(
	// 	{},
	// 	{ username: userObj.username, password: userObj.password }
	// )
	return db.user.findOrCreate({
		where: { username: userObj.username },
		defaults: userObj
	})
}
