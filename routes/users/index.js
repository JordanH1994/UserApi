'use strict';
var usersController = require('../../controllers/usersController');
var User = {};

User.getAll = function(req, res) {
  usersController.getAll()
  .then(function(users) {
    return res.send(users);
  })
  .fail(function(error) {
    return res.send(500, error);
  });
};

User.getOne = function(req, res) {
  usersController.get(req.params.id)
  .then(function(user) {
    if (!user) {
      return res.send('Error user with id: ' + req.params.id + ' does not exist');
    }
    return res.send(user);
  })
  .fail(function(error) {
    return res.send(500, error);
  });
};

User.destroy = function(req, res) {
  return usersController.delete(req.params.id)
  .then(function(result) {
    if (result === 1) {
      return res.redirect(303, '/users');
    }
    return res.send(new Error('Cannot Delete User with id: ' + req.params.id));
  })
  .fail(function(error) {
    return res.send(500, error);
  });
};

User.update = function(req, res) {
  return usersController.update(req.params.id, req.body)
  .then(function(result) {
    return res.send(result);
  })
  .fail(function(error) {
    return res.send(500, error);
  });
};

User.create = function(req, res) {
  return usersController.create(req.body)
  .then(function(result) {
    res.send(result);
  })
  .fail(function(error) {
    return res.send(500, error);
  });
};

module.exports = User;