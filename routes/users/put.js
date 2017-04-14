'use strict';

var Boom = require( 'boom' );
var Joi = require( 'joi' );
var _ = require( 'lodash' );

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
      },
      query: {
      }
    },
  },
  handler: function( request, reply ) {
    reply()
  }
}
