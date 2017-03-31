'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.dropAllTables()

    /* vote table */
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

    /* user table */
    queryInterface.createTable('user', {
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    },
    {
      freezeTableName: true,
      classMethods: {
        associate: function (models) {
          user.belongsToMany(models.quiz, { through: 'vote', foreignKey: 'user_id' })
          user.hasMany(models.userquiz)
        }
      }
    })

    /* quiz */
    queryInterface.createTable('quiz', {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      made_by: {
        type: Sequelize.INTEGER
      }
    },
    {
      // underscored: true,
      freezeTableName: true,
      classMethods: {
        associate: function (models) {
          quiz.belongsToMany(models.user, { through: 'vote', foreignKey: 'quiz_id' })
          quiz.hasMany(models.userquiz)
        }
      } // end classMethods
    })

    /* userquiz */
    queryInterface.createTable('userquiz', {
      score: {
        type: Sequelize.DECIMAL(5, 2)
      },
      userAnswers: {
        type: Sequelize.JSON
      }
    },
    {
      // underscored: true,
      freezeTableName: true,
      classMethods: {
        associate: function (models) {
          userquiz.belongsTo(models.quiz, {
            foreignKey: {
              allowNull: false
            }
          })
          userquiz.belongsTo(models.user, {
            foreignKey: {
              allowNull: false
            }
          })
        }
      }
    })

  }, // end of the up

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.dropAllTables()
  }
}
