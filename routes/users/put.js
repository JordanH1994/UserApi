'use strict'
const {head} = require('lodash')
const Joi = require('joi')
const usersController = require('../../controllers/usersController')
const Boom = require('boom')

module.exports = {
  method: 'PUT',
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
      },
      payload: {
        forename: Joi.string().required(),
        surname: Joi.string().required(),
        email: Joi.string().email().required()
      }
    }
  },
  handler: function (request, reply) {
    const user = {
      forename: request.payload.forename,
      surname: request.payload.surname,
      email: request.payload.email
    }
    return usersController.update(request.params.id, user)
    .then((user) => {
      if (head(user) === 0) {
        return reply(Boom.notFound(`Cant not update user with Id: ${request.params.id}, user does not exist`))
      }
      return reply().code(204)
    })
  }
}
