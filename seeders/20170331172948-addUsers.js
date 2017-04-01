'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('user', [
      {
        username: 'Alan'
      },
      {
        username: 'Bobcat'
      }
    ])
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('user', {
      username: [
        'Alan',
        'bobCat'
      ]
    })
  } // ends down
}
