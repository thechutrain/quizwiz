module.exports = function(sequelize, DataTypes) {
  var quiz = sequelize.define('quiz',
      // columns
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
        },
        made_by: {
          type: DataTypes.INTEGER,
          // ??? WAY TO LINK AS A FOREIGN KEY TO USER ???
        }
      },
      // options
      {
        underscored: true,
        freezeTableName: true,
        classMethods: {
          associate: function(models) {
            quiz.belongsToMany(models.user, { through: 'vote', foreignKey: 'quiz_id' });
            quiz.hasMany(models.userquiz);
          }
        } // end classMethods
      }
    ) // end .define
  return quiz;
};