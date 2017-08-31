module.exports = function(sequelize, DataTypes) {
	var quiz = sequelize.define(
		'quiz',
		// columns
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false
			},
			description: {
				type: DataTypes.TEXT
			},
			madeBy: {
				type: DataTypes.INTEGER,
				references: {
					model: 'user',
					key: 'id'
					// allowNull: false
				}
				// onUpdate: 'cascade',
				// onDelete: 'cascade'
			}
		},
		// options
		{
			freezeTableName: true
		}
	)

	// Class Methods
	quiz.associate = function(models) {
		quiz.hasMany(models.userquiz)
		// quiz.hasMany(models.vote)
		// quiz.hasMany(models.question)
	}
	return quiz
}
