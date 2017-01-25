'use strict';
var Q = require('q');
var models = require('../models/');
var UsersController = {};
var { isEmpty } = require('lodash');


UsersController.getAll = function() {
  var deferred = Q.defer();
  models.user.findAll({
    raw: true
  })
  .then(function(users) {
    if (isEmpty(users)) {
      return deferred.reject( new Error('Could not find any users'));
    }
    return deferred.resolve(users);
  })
  .catch(function(error) {
    return deferred.reject(new Error('Error retrieving users.' + error));
  });
  return deferred.promise;
};

UsersController.get = function(id) {
  var deferred = Q.defer();
  models.user.find({
    raw: true,
    where: {
      id: id
    }
  }).then(function(user) {
    return deferred.resolve(user);
  })
  .catch(function(error) {
    return deferred.reject('error retrieving user.' + error);
  });
  return deferred.promise;
};

UsersController.update = function(id, data) {
  var deferred = Q.defer();
  models.user.update(data, {
    where: {
      id: id
    },
    returning: true
  }).then(function(result) {
    return deferred.resolve(result);
  })
  .catch(function(err) {
    return deferred.reject(err);
  });
  return deferred.promise;
};

UsersController.delete = function(id) {
  var deferred = Q.defer();
  models.user.destroy({
    where: {
      id: id
    }
  }).then(function(result) {
    return deferred.resolve(result);
  })
  .catch(function(err) {
    return deferred.reject(err);
  });
  return deferred.promise;
};

UsersController.create = function(data) {
  var deferred = Q.defer();
  var userDetails = {
    email: data.email,
    forname: data.forname,
    surname: data.surname,
    createdOn: new Date().toString()
  };

  models.user.create(userDetails)
  .then(function(user) {
    return deferred.resolve(user);
  })
  .catch(function(err) {
    deferred.reject(err);
  });
  return deferred.promise;
};
module.exports = UsersController;
