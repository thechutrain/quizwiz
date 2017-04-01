'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('vote', {
      userId: {
        type: Sequelize.INTEGER
      },
      quizId: {
        type: Sequelize.INTEGER
      },
      stars: {
        type: Sequelize.INTEGER
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('vote')
  }
}
