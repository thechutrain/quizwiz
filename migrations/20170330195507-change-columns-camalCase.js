'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.renameColumn('vote', 'quiz_id', 'quizId')
    queryInterface.renameColumn('vote', 'user_id', 'userId')
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.renameColumn('vote', 'quizId', 'quiz_id')
    queryInterface.renameColumn('vote', 'userId', 'user_id')
  }
}
