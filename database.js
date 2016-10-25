'use strict';
let orm = require("orm");
let db;
let Users;
const util = require('util')
module.exports = {
  setup: (connectionConfig, callback) => {
    // setup the database connection
    let opts = {
      host: connectionConfig.host,
      database: connectionConfig.database,
      user: connectionConfig.user,
      password: connectionConfig.password,
      protocol: 'postgres',
      query:
        {
          pool: true
        }
    };
    db = orm.connect(opts, (err, db) => {
    if(err) return callback(err, null);
    db.settings.set("instance.autoSave", true);
    Users = db.define('users', {
      id: {type: 'serial', key:true}, 
      email: {type: 'text'},
      forename: {type: 'text'},
      surename: {type: 'text'},
      created_on: {type: 'text'},
    }, {
      methods :{
        setSurename : function(surename){
          this.surename = surename;
        },
        setForename: function(forename){
          this.forename = forename;
        },
        setEmail: function(email){
          this.email = email;
        }
      }
    });

    return callback(null, true);
    });
  },

  getAllUsers: (callback) => {
    Users.all((err, res) =>{
        return callback(err, res);
    })
  },
  search: (params, callback) => {
    Users.find({forename : params.forename, surename: params.surename}, (err, res) => {
      return callback(err, res);
    })
  },

  insertUser: (params, callback) => {
    let newRecord = {
      forename: params.forename,
      surename: params.surename,
      email: params.email
    };
    Users.create(newRecord, (err, res) =>{
      return callback(err, res);
    })
  },

  updateUser: (newData, oldData, callback) => {
    Users.find({forename : oldData.forename, surename: oldData.surename},1, (err, person) => {
      person = person[0]; //ditch the array it comes back in
      person.email = newData.email;
      person.forename = newData.forename;
      person.surename = newData.surename; 
      person.save((err) => {
        return callback(err, true);
      })
    });
  },

  deleteUser: (userToDelete, callback) => {
  Users.find({forename : userToDelete.forename, surename: userToDelete.surename},1, (err, person) => {
    person = person[0]; //ditch the array it comes back in
    person.remove(callback);
  })
  }
};
