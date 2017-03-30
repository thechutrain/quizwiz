module.exports = function (sequelize, DataTypes) {
  var userquiz = sequelize.define('userquiz',
      // column names
    {
      score: {
        type: DataTypes.DECIMAL(5, 2)
      },
      userAnswers: {
        type: DataTypes.JSON
      }
    },
      // options
    {
      // underscored: true,
      freezeTableName: true,
      classMethods: {
        associate: function (models) {
          userquiz.belongsTo(models.quiz, {
            foreignKey: {
              allowNull: false
            }
          })
          userquiz.belongsTo(models.user, {
            foreignKey: {
              allowNull: false
            }
          })
        }
      }
    }) // end of define
  return userquiz
}
