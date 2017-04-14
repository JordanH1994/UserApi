'use strict'
const {user} = require('../models/')
const UsersController = {}

UsersController.getAll = () => {
  return user.findAll({
    raw: true
  })
}

UsersController.get = (id) => {
  return user.find({
    raw: true,
    where: {
      id: id
    }
  })
}

UsersController.update = (id, data) => {
  return user.update(data, {
    where: {
      id: id
    },
    returning: true
  })
}

UsersController.delete = (id) => {
  return user.destroy({
    where: {
      id: id
    }
  })
}

UsersController.create = (user) => {
  return user.create(user)
}

exports = module.exports = UsersController
