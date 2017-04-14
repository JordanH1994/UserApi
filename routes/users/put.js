'use strict'
const {head} = require('lodash')
const Joi = require('joi')
const usersController = require('../../controllers/usersController')

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
      // check user result for[ 0, [] ]
      reply(head(user[1])).code(201)
    })
  }
}
