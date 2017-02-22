'use strict'
const usersController = require('../../controllers/usersController')
let User = {}

User.getAll = (req, res) => {
  usersController.getAll()
  .then((users) => {
    return res.send(users)
  })
  .fail((error) => {
    return res.send(500, error)
  })
}

User.getOne = (req, res) => {
  usersController.get(req.params.id)
  .then((user) => {
    if (!user) {
      return res.send('Error user with id: ' + req.params.id + ' does not exist')
    }
    return res.send(user)
  })
  .fail((error) => {
    return res.send(500, error)
  })
}

User.destroy = (req, res) => {
  return usersController.delete(req.params.id)
  .then((result) => {
    if (result === 1) {
      return res.redirect(303, '/users')
    }
    return res.send(new Error('Cannot Delete User with id: ' + req.params.id))
  })
  .fail((error) => {
    return res.send(500, error)
  })
}

User.update = (req, res) => {
  return usersController.update(req.params.id, req.body)
  .then((result) => {
    return res.send(result)
  })
  .fail((error) => {
    return res.send(500, error)
  })
}

User.create = (req, res) => {
  return usersController.create(req.body)
  .then((result) => {
    res.send(result)
  })
  .fail((error) => {
    return res.send(500, error)
  })
}

module.exports = User
