module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User',
    // columns of table
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }
    },
    // options
    {
      underscored: true,
      freezeTableName: true,
      classMethods: {
        associate: function(models) {
          // make associates here later!
        }
      } // end classMethods
    }); // end .define
  return User;
};