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

  findUser: function(id){
    return id ? db.user.findOne({ where: { id }}) : db.user.findAll();
  }
}