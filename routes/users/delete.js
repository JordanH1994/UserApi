'use strict';

const Boom = require( 'boom' );
const Joi = require( 'joi' );
const _ = require( 'lodash' );
const usersController = require('../../controllers/usersController')

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
  handler: function(request, reply) {
    return usersController.delete(request.params.id)
    .then((res) => {
      reply().code(204)
    })
  }
}
