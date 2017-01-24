'use strict';
var express = require('express');
var router = new express.Router();
var usersController = require('../controllers/usersController');
/* GET home page. */
router.get('/', function(req, res) {
  usersController.get(req, res)
  .then(function(users) {
    res.render('index', {
      title: 'Sequelize: Express Example',
      users: users
    });
  });
});

module.exports = router;
