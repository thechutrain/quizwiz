const db = require('../models');

// validators
// TO DO LATER
// const user_req_fields = ['username'];

module.exports = {
  // test: function() {
  //   return db.user.findAll({});
  // },

  findUser: (id) => (id ? db.user.findOne({ where: { id }}) : db.user.findAll()),

  addUser: (userObj) => {
    return db.user.findOrCreate({ where: { username: userObj.username }, defaults: userObj });
  }
}