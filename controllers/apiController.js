const db = require('../models');

module.exports = {
  // test: function(cb){
  //   db.user.findAll({}).then((results) => {
  //     cb(results);
  //   });
  // }
  test: function(){
    return db.user.findAll({});
  },

  // test_v2: function(){
  //   return new Promise((resolve, reject) => {
  //     resolve();
  //   })
  // },

  // findAllUsers: function(){
  //   return db.user.findAll({}).then
  // }
}