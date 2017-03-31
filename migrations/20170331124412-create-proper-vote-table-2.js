'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    /* vote table */
    queryInterface.dropTable('vote');
    queryInterface.createTable('vote',
      {
        highScore: {
          type: Sequelize.DECIMAL(5, 2)
        },
        userAnswers: {
          type: Sequelize.JSON
        },
        stars: {
          type: Sequelize.INTEGER,
          defaultValue: -1,
          validate: {
            min: -1,
            max: 5
          }
        },
        likes: {
          type: Sequelize.INTEGER,
          defaultValue: -1,
          validate: {
            min: -1,
            max: 1
          }
        }
      },
      {
        underscored: true,
        freezeTableName: true
      }
    )

  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.createTable('vote',
      {
        highScore: {
          type: Sequelize.DECIMAL(5, 2)
        },
        userAnswers: {
          type: Sequelize.JSON
        },
        stars: {
          type: Sequelize.INTEGER,
          defaultValue: -1,
          validate: {
            min: -1,
            max: 5
          }
        },
        likes: {
          type: Sequelize.INTEGER,
          defaultValue: -1,
          validate: {
            min: -1,
            max: 1
          }
        }
      },
      {
        underscored: true,
        freezeTableName: true
      }
    )
  }
};
