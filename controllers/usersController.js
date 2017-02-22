'use strict'
const Q = require('q')
const models = require('../models/')
const UsersController = {}
const { isEmpty } = require('lodash')

UsersController.getAll = () => {
  const deferred = Q.defer()
  models.user.findAll({
    raw: true
  })
  .then((users) => {
    if (isEmpty(users)) {
      return deferred.reject(new Error('Could not find any users'))
    }
    return deferred.resolve(users)
  })
  .catch((error) => {
    return deferred.reject(new Error('Error retrieving users.' + error))
  })
  return deferred.promise
}

UsersController.get = (id) => {
  const deferred = Q.defer()
  models.user.find({
    raw: true,
    where: {
      id: id
    }
  }).then((user) => {
    return deferred.resolve(user)
  })
  .catch((error) => {
    return deferred.reject(new Error('error retrieving user.' + error))
  })
  return deferred.promise
}

UsersController.update = (id, data) => {
  const deferred = Q.defer()
  models.user.update(data, {
    where: {
      id: id
    },
    returning: true
  }).then((result) => {
    return deferred.resolve(result)
  })
  .catch((err) => {
    return deferred.reject(err)
  })
  return deferred.promise
}

UsersController.delete = (id) => {
  const deferred = Q.defer()
  models.user.destroy({
    where: {
      id: id
    }
  }).then((result) => {
    return deferred.resolve(result)
  })
  .catch((err) => {
    return deferred.reject(err)
  })
  return deferred.promise
}

UsersController.create = (data) => {
  const deferred = Q.defer()
  models.user.create(data)
  .then((user) => {
    return deferred.resolve(user)
  })
  .catch((err) => {
    deferred.reject(err)
  })
  return deferred.promise
}
module.exports = UsersController
