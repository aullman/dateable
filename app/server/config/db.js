var Sequelize = require('sequelize')
    , settings = require('./settings')
var fs = require('fs')
    , path = require('path')
    , Sequelize = require('sequelize')
    , lodash = require('lodash')
    , sequelize = new Sequelize(
        process.env.DATABASE_URL
    )
    , db = {}
    , modelsDir = path.join(settings.path, 'app/server/models');

fs
    .readdirSync(path.join(modelsDir))
    .filter(function (file) {
      return (file.indexOf('.') !== 0)
    })
    .forEach(function (file) {
      var model = sequelize.import(path.join(modelsDir, file))
      db[model.name] = model
    })

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db)