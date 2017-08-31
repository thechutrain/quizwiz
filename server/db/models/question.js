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
			freezeTableName: true
		}
	)
	// Class Methods
	question.associate = function(models) {
		question.belongsTo(models.quiz, { foreignKey: 'quizId' })
	}
	return question
}
