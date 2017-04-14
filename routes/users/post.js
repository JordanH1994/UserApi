'use strict'

const Joi = require('joi')
const usersController = require('../../controllers/usersController')

module.exports = {
  method: 'POST',
  path: '/users',
  config: {
    description: 'A route to create a user',
    tags: ['api', 'Users'],
    validate: {
      options: {
        allowUnknown: true
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

    return usersController.create(user)
    .then((res) => {
      return reply(res).code(201)
    })
  }
}
