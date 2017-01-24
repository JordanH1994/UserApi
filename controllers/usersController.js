'use strict';

var models = require('../models/');
var UsersController = {};

UsersController.getAll = function() {
  return models.user.findAll({ raw: true })
    .then(function(users) {
      if (users.length) {
        return users;
      }
      return 'Could not find any users.';
    })
    .catch(function(error) {
      return 'Error retrieving users.' + error;
    });
};

UsersController.get = function(id) {
  return models.user.find({
    raw: true,
    where: {
      id: id
    }
  }).then(function(user) {
    return user;
  })
  .catch(function(error) {
    return 'error retrieving user.' + error;
  });
};

UsersController.update = function() {
};

UsersController.delete = function(id) {
  models.user.destroy({
    where: {
      id: id
    }
  }).then(function() {
      //do nothing
  });
};

UsersController.create = function(data) {

  var userDetails = {
    email: data.email,
    forname: data.forname,
    surname: data.surname,
    createdOn: new Date().toString()
  };

  models.user.create(userDetails)
  .then(function(user) {
    return user;
  });
};
module.exports = UsersController;
