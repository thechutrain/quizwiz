const db = require('../models');

// validators
const user_req_fields = ['username'];

module.exports = {
  // test: function() {
  //   return db.user.findAll({});
  // },

  findUser: (id) => (id ? db.user.findOne({ where: { id }}) : db.user.findAll()),

  addUser: (userObj) => {
    // validate userObj
    let valid = true;
    userObjKeys = Object.keys(userObj);
    user_req_fields.forEach((key) => {
      if (userObjKeys.indexOf(key)){ valid = false };
    });
    if (!valid) { return Promise.resolve({ error: true, msg: 'Missing required fields' })};
    return db.user.findOrCreate({ where: { username: userObj.username }, defaults: userObj });
  }
}