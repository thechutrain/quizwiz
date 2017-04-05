'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('vote', {
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        reference: {
          model: 'user',
          key: 'id'
          // onUpdate: 'CASCADE',
          // onDelete: 'RESTRICT'
        }
      },
      quizId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        reference: {
          model: 'quiz',
          key: 'id'
          // onUpdate: 'CASCADE',
          // onDelete: 'RESTRICT'
        }
      },
      stars: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    },
      {
        freezeTableName: true
      })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('vote')
  }
}
