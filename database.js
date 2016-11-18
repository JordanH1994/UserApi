'use strict';
let orm = require('orm');

let Users;
module.exports = {
  setup: (connectionConfig, callback) => {
    // setup the database connection
    if (!connectionConfig) return callback('no connection params', null);
    let opts = {
      host: connectionConfig.host,
      database: connectionConfig.database,
      user: connectionConfig.user,
      password: connectionConfig.password,
      protocol: connectionConfig.protocol,
      query:
      {
        pool: true
      }
    };
    orm.connect(opts, (err, database) => {
      if (err) return callback(err, null);
      database.settings.set('instance.autoSave', true);
      Users = database.define('users', {
        id: { type: 'serial', key: true },
        email: { type: 'text' },
        forename: { type: 'text' },
        surename: { type: 'text' },
        created_on: { type: 'text' }
      });
      return callback(null, true);
    });
  },

  getAllUsers: (callback) => {
    Users.all((err, res) => {
      return callback(err, res);
    });
  },
  search: (params, callback) => {
    Users.find({ forename: params.forename, surename: params.surename }, (err, res) => {
      return callback(err, res);
    });
  },

  insertUser: (params, callback) => {
    let newRecord = {
      forename: params.forename,
      surename: params.surename,
      email: params.email
    };
    Users.create(newRecord, (err, res) => {
      return callback(err, res);
    });
  },

  updateUser: (newData, oldData, callback) => {
    Users.find({ forename: oldData.forename, surename: oldData.surename }, 1, (err, person) => {
      if (err) return callback(err);
      person = person[0]; //ditch the array it comes back in
      person.email = newData.email;
      person.forename = newData.forename;
      person.surename = newData.surename;
      return person.save((error) => {
        return callback(error, true);
      });
    });
  },

  deleteUser: (userToDelete, callback) => {
    Users.find({ forename: userToDelete.forename, surename: userToDelete.surename }, 1, (err, person) => {
      if (err) return callback(err);
      person = person[0]; //ditch the array it comes back in
      return person.remove(callback);
    });
  }
};
