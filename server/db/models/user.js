const bcrypt = require('bcryptjs')

module.exports = function(sequelize, DataTypes) {
	var user = sequelize.define(
		'user',
		// columns of table
		{
			username: {
				type: DataTypes.STRING,
				allowNull: false
			},
			password: {
				type: DataTypes.STRING
			}
			// isAdmin: {
			//   type: DataTypes.BOOLEAN,
			//   defaultValue: false
			// }
		},
		// options
		{
			freezeTableName: true
		}
	)
	// Class Methods
	user.associate = function(models) {
		user.hasMany(models.userquiz)
		user.hasMany(models.vote)
	}
	user.hashPassword = function(inputPassword) {
		return new Promise((resolve, reject) => {
			bcrypt
				.genSalt(10)
				.then((salt, error) => {
					if (error) {
						return reject(error)
					}
					return bcrypt.hash(inputPassword, salt)
				})
				.then((hash, error) => {
					if (error) {
						return reject(error)
					}
					return resolve(hash)
				})
		}) // ends new Promise
	}
	// Instance Methods
	user.prototype.comparePassword = function(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	}
	// hooks
	user.addHook('beforeCreate', newUser => {
		const password = JSON.parse(JSON.stringify(newUser)).password
		return user.hashPassword(password).then(hash => {
			newUser.password = hash
			return newUser
		})
	})
	return user
}
