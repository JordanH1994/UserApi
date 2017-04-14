'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const dbUrl = process.env.DATABASE_URL
const config = require('../config/config')(env)
const db = {}
let sequelize

if (env !== 'development') {
  sequelize = new Sequelize(dbUrl, config.database)
} else {
  sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, config.database)
}
fs.readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
