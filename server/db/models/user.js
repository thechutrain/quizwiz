const bcrypt = require('bcryptjs')

module.exports = function (sequelize, DataTypes) {
  var user = sequelize.define('user',
    // columns of table
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING
      }
      // isAdmin: {
      //   type: DataTypes.BOOLEAN,
      //   defaultValue: false
      // }
    },
    // options
    {
      freezeTableName: true,
      classMethods: {
        associate: function (models) {
          user.hasMany(models.userquiz)
          user.hasMany(models.vote)
        },
        hashPassword: function (inputPassword) {
          return new Promise((resolve, reject) => {
            bcrypt.genSalt(10)
            .then((salt, error) => {
              if (error) {
                return reject(error)
              }
              return bcrypt.hash(inputPassword, salt)
            })
            .then((hash, error) => {
              if (error) {
                return reject(error)
              }
              return resolve(hash)
            })
          }) // ends new Promise
        }
      },
      instanceMethods: {
        comparePassword: function (inputPassword) {
          return bcrypt.compareSync(inputPassword, this.password)
        }
      },
      hooks: {
        beforeCreateOptions: {},
        beforeCreate: function (pt, beforeCreateOptions, done) {
          const password = JSON.parse(JSON.stringify(pt)).password
          return this.hashPassword(password).then((hash) => {
            pt.password = hash
            done()
          })
        }
      }
    }) // end .define
  return user
}
