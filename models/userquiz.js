module.exports = function (sequelize, DataTypes) {
  var userquiz = sequelize.define('userquiz',
    // columns of table
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      quizID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'quiz',
          key: 'id'
        }
      },
      score: {
        type: DataTypes.DECIMAL(5, 2)
      }
      // isAdmin: {
      //   type: DataTypes.BOOLEAN,
      //   defaultValue: false
      // }
    },
    // options
    {
      freezeTableName: true
    }) // end .define
  return userquiz
}
