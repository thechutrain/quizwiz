'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
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
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('user')
  }
}
