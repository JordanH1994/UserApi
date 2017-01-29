'use strict';
const express = require('express');
const router = new express.Router();
const User = require('./users/index.js');


router.get('/', User.getAll);
router.get('/read/:id', User.getOne);
router.delete('/:id', User.destroy);
router.put('/:id', User.update);
router.post('/', User.create);

module.exports = router;
