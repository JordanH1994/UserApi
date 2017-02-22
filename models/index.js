'use strict'

var fs = require('fs')
var path = require('path')
var Sequelize = require('sequelize')
var env = process.env.NODE_ENV || 'development'
var config = require('../config/config')(env)
var db = {}

var sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, config.database)

fs.readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach((file) => {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
