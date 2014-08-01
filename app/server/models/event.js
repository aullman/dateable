var OpenTok = require('opentok'),
    opentok = new OpenTok(process.env.OPEN_TOK_API_KEY, process.env.OPEN_TOK_SECRET);

module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    sessionId: DataTypes.STRING
  }, {
    instanceMethods: {

    },
    classMethods: {
//      associate: function(models) {
//        User.hasMany(models.Task)
//      }
    }
  })

  return Event
}