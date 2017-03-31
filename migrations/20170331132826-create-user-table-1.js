'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable(
       'user',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false
        }
          // foreign key usage
          // attr4: {
          //     type: Sequelize.INTEGER,
          //     references: {
          //         model: 'another_table_name',
          //         key: 'id'
          //     },
          //     onUpdate: 'cascade',
          //     onDelete: 'cascade'
          // }
      }
      )
    // return queryInterface.createTable('user',
    //     {
    //       id: {
    //         type: Sequelize.INTEGER,
    //         primaryKey: true,
    //         autoIncrement: true
    //       },
    //       createdAt: {
    //         type: Sequelize.Date
    //       },
    //       updatedAt: {
    //         type: Sequelize.Date
    //       },
    //       username: {
    //         type: Sequelize.STRING,
    //         allowNull: false,
    //       },
    //       isAdmin: {
    //         type: Sequelize.BOOLEAN,
    //         defaultValue: false
    //       }
    //     }
    //   ) // ends createTable
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('user')
  }
}
