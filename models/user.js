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
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    // options
    {
      underscored: true,
      freezeTableName: true,
      classMethods: {
        associate: function (models) {
          user.belongsToMany(models.quiz, { through: 'vote', foreignKey: 'user_id' })
          user.hasMany(models.userquiz)
        }
      } // end classMethods
    }) // end .define
  return user
}
