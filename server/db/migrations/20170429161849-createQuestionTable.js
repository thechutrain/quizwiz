'use strict'

module.exports = {
	up: function(queryInterface, Sequelize) {
		return queryInterface.createTable(
			'question',
			{
				id: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true
				},
				quizId: {
					type: Sequelize.INTEGER,
					references: {
						model: 'quiz',
						key: 'id'
					}
				},
				question: { type: Sequelize.STRING, allowNull: false },
				choices: { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: false },
				correctAnswer: { type: Sequelize.INTEGER, allowNull: false },
				createdAt: { type: Sequelize.DATE },
				updatedAt: { type: Sequelize.DATE }
			},
			{
				freezeTableName: true
			}
		) // ends createTable
	},

	down: function(queryInterface, Sequelize) {
		return queryInterface.dropTable('question')
	}
}
