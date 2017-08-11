module.exports = function(sequelize, DataTypes) {
	var question = sequelize.define(
		'question',
		// columns
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			quizId: {
				type: DataTypes.INTEGER,
				references: {
					model: 'quiz',
					key: 'id'
				}
			},
			question: { type: DataTypes.STRING, allowNull: false },
			choices: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
			correctAnswer: { type: DataTypes.INTEGER, allowNull: false }
		},
		// options
		{
			freezeTableName: true,
			classMethods: {
				associate: function(models) {
					// quiz.belongsToMany(models.user, { through: 'vote', foreignKey: 'quizId' })
					question.belongsTo(models.quiz, { foreignKey: 'quizId' })
				}
			} // end classMethods
		}
	) // end .define
	return question
}
