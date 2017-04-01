module.exports = function (sequelize, DataTypes) {
  var vote = sequelize.define('vote',
    // columns of table
    {
      userId: {
        type: DataTypes.INTEGER
      },
      quizId: {
        type: DataTypes.INTEGER
      },
      stars: {
        type: DataTypes.INTEGER
      }
    },
    // options
    {
      freezeTableName: true
    }) // end .define
  return vote
}
