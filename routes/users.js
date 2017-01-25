'use strict';
var express = require('express');
var router = new express.Router();
var usersController = require('../controllers/usersController');


router.get('/', function(req, res) {
  usersController.getAll()
  .then(function(users) {
    return res.send(users);
  })
  .fail(function(error) {
    return res.send(500, error);
  });
});

router.get('/read/:id', function(req, res) {
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
});

router.delete('/:id', function(req, res) {
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
});

router.put('/:id', function(req, res) {
  return usersController.update(req.params.id, req.body)
  .then(function(result) {
    return res.send(result);
  })
  .fail(function(error) {
    return res.send(500, error);
  });
});

router.post('/', function(req, res) {
  return usersController.create(req.body)
  .then(function(result) {
    res.send(result);
  })
  .fail(function(error) {
    return res.send(500, error);
  });
});

module.exports = router;
