let DBWrapper = require('node-dbi').DBWrapper
let config = require('./.databaseConfig')
let dbWrapper

module.exports = {
  setup: (callback) => {
    // setup the database connection config
    let dbConnectionConfig = { host: config.db.host, user: config.db.username, password: config.db.password, database: config.db.database }
    dbWrapper = new DBWrapper('pg', dbConnectionConfig)
    // connect to the database
    dbWrapper.connect()
    callback(null, true)
  },

  getAllUsers: (callback) => {
    dbWrapper.fetchAll('SELECT * FROM users', null, (err, res) => {
      if (err) return callback(err)
      callback(null, res)
    })
  },

  search: (params, callback) => {
    dbWrapper.fetchAll('SELECT * FROM users WHERE forename LIKE ? AND surename LIKE ?', ['%' + params.forename + '%', '%' + params.surename + '%'], (err, result) => {
      if (err) return callback(err)
      callback(null, result)
    })
  },

  insertUser: (params, callback) => {
    let date = new Date()
    let userData = {email: params.email, forename: params.forename, surename: params.surename, created_on: date.toLocaleDateString() + ' ' + date.toLocaleTimeString()}
    dbWrapper.insert('users', userData, (err) => {
      if (err) return callback(err)
      callback(null, true)
    })
  },

  updateUser: (newData, oldData, callback) => {
    dbWrapper.update('users', newData, [['forename=?', oldData.forename], ['surename=?', oldData.surename]], (err, res) => {
      if (err) return callback(err)
      callback(null, res)
    })
  },

  deleteUser: (userToDelete, callback) => {
    dbWrapper.remove('users', [ ['forename=?', userToDelete.forename], ['surename=?', userToDelete.surename] ], (err, res) => {
      if (err) return callback(err)
      callback(null, res)
    })
  }
}
