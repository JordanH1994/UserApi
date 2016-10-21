'use strict';
let orm = require("orm");
let db;
module.exports = {
  setup: (connectionConfig, callback) => {
    // setup the database connection
    let opts = {
    host: connectionConfig.host,
    database: connectionConfig.database,
    user: connectionConfig.user,
    password: connectionConfig.password,
    protocol: 'postgres',
    query:    {pool: true}
    };
    db = orm.connect(opts, (err, db) => {
    if(err) return callback(err, null);
    return callback(null, true);
   });
  },
}
//   getAllUsers: (callback) => {
//     dbWrapper.fetchAll('SELECT * FROM users', null, (err, res) => {
//       if (err) return callback(err);
//       callback(null, res);
//     });
//   },

//   search: (params, callback) => {
//     dbWrapper.fetchAll('SELECT * FROM users WHERE forename LIKE ? AND surename LIKE ?', ['%' + params.forename + '%', '%' + params.surename + '%'], (err, result) => {
//       if (err) return callback(err);
//       callback(null, result);
//     });
//   },

//   insertUser: (params, callback) => {
//     let date = new Date();
//     let userData = { email: params.email, forename: params.forename, surename: params.surename, created_on: date.toLocaleDateString() + ' ' + date.toLocaleTimeString() };
//     dbWrapper.insert('users', userData, (err) => {
//       if (err) return callback(err);
//       callback(null, true);
//     });
//   },

//   updateUser: (newData, oldData, callback) => {
//     dbWrapper.update('users', newData, [['forename=?', oldData.forename], ['surename=?', oldData.surename]], (err, res) => {
//       if (err) return callback(err);
//       callback(null, res);
//     });
//   },

//   deleteUser: (userToDelete, callback) => {
//     dbWrapper.remove('users', [ ['forename=?', userToDelete.forename], ['surename=?', userToDelete.surename] ], (err, res) => {
//       if (err) return callback(err);
//       callback(null, res);
//     });
//   }
// };
