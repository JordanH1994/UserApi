'use strict'

const Joi = require('joi')
const usersController = require('../../controllers/usersController')
const Boom = require('boom')
module.exports = {
  method: 'DELETE',
  path: '/users/{id}',
  config: {
    description: 'tmp',
    tags: 'Users',
    validate: {
      options: {
        allowUnknown: true
      },
      params: {
        id: Joi.number().integer().required()
      }
    }
  },
  handler: function (request, reply) {
    return usersController.delete(request.params.id)
    .then((res) => {
      if (res === 1) {
        return reply().code(204)
      }
      return reply(Boom.notFound(`No user found with Id: ${request.params.id}`))
    })
  }
}
