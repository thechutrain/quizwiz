// const db = require('../db/models')

// module.exports = {
//   findUserById: (id) => {
//     return db.user.findOne({
//       where: { id },
//       include: [
//         { model: db.userquiz },
//         { model: db.vote }
//       ]
//     })
//   },
//   findAllUsers: () => {
//     return db.user.findAll()
//   },
//   addUser: (userObj) => {
//     return db.user.findOrCreate({ where: { username: userObj.username }, defaults: userObj })
//   }
// }
