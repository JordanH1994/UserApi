'use strict';
var express = require('express');
var router = new express.Router();
var usersController = require('../controllers/usersController');


/* GET users listing. */
router.get('/', function(req, res) {
  usersController.getAll()
  .then(function(users) {
    return res.send(users);
  });
});

router.get('/read/:id', function(req, res) {
  usersController.get(req.params.id)
  .then(function(user) {
    return res.send(user);
  });
});

router.delete('/:id', function(req, res) {
  usersController.delete(req.params.id);
  res.redirect('/users');
});

// router.put('/', function(req, res) {
//   console.log(req.body)
// });

router.post('/', function(req, res) {
  usersController.create(req.body);
  res.redirect('/users');
});

module.exports = router;
