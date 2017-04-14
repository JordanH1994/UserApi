'use strict'
const Joi = require('joi')
const _ = require('lodash')
const usersController = require('../../controllers/usersController')
const Boom = require('boom')

module.exports = {
  method: 'GET',
  path: '/users/read/{id?}',
  config: {
    description: 'tmp',
    tags: 'Users',
    validate: {
      options: {
        allowUnknown: true
      },
      params: {
        id: Joi.number().integer().empty('').optional()
      }
    }
  },
  handler: (request, reply) => {
    if (_.isUndefined(request.params.id)) {
      return usersController.getAll()
      .then((users) => {
        return reply({users: users})
      })
    } else {
      return usersController.get(request.params.id)
      .then((user) => {
        if (_.isEmpty(user)) {
          return reply(Boom.notFound(`No user found with Id: ${request.params.id}`))
        }
        return reply({user: user})
      })
    }
  }
}
