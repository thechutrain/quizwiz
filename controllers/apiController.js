const db = require('../models');

module.exports = {
  test: function(cb){
    db.user.findAll({}).then((results) => {
      cb(results);
    });
  }
  // findAllUsers: function(){
  //   return db.user.findAll({}).then
  // }
}