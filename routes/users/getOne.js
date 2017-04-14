'use strict'
const Joi = require('joi')
const _ = require('lodash')
const usersController = require('../../controllers/usersController')
const Boom = require('boom')

module.exports = {
  method: 'GET',
  path: '/users/read/{id}',
  config: {
    description: 'Get a single stored User',
    tags: ['api', 'Users'],
    validate: {
      options: {
        allowUnknown: true
      },
      params: {
        id: Joi.number().integer().required()
      }
    }
  },
  handler: (request, reply) => {
    return usersController.get(request.params.id)
    .then((user) => {
      if (_.isEmpty(user)) {
        return reply(Boom.notFound(`No user found with Id: ${request.params.id}`))
      }
      return reply({user: user})
    })
  }
}
