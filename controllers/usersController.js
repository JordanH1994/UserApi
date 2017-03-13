'use strict'
const {user} = require('../models/')
const UsersController = {}

UsersController.getAll = (req, res) => {
  return user.findAll({
    raw: true
  })
  .then((users) => {
    return res.send(users)
  })
}

UsersController.get = (req, res) => {
  const id = req.params.id
  return user.find({
    raw: true,
    where: {
      id: id
    }
  })
  .then((user) => {
    return res.send(user)
  })
}

UsersController.update = (req, res) => {
  const id = req.params.id
  const data = req.body
  return user.update(data, {
    where: {
      id: id
    },
    returning: true
  })
  .then((user) => {
    return res.send(user)
  })
}

UsersController.delete = (req, res) => {
  const id = req.params.id
  return user.destroy({
    where: {
      id: id
    }
  })
  .then((result) => {
    if (result === 1) return res.send(204)
    return res.send(new Error('Cannot Delete User with id: ' + req.params.id))
  })
}

UsersController.create = (req, res) => {
  return user.create(req.body)
  .then((user) => {
    res.send(user, 201)
  })
}

module.exports = UsersController
