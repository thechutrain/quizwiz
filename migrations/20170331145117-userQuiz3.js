'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('userquiz',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          onDelete: 'CASCADE',
          references: {
            model: 'user',
            key: 'id'
          }
        },
        quizId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          onDelete: 'CASCADE',
          references: {
            model: 'quiz',
            key: 'id'
          }
        },
        score: {
          type: Sequelize.DECIMAL(5, 2)
        }
      })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('userquiz')
  }
}
