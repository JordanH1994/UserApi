'use strict';

var Boom = require( 'boom' );
var Joi = require( 'joi' );
var _ = require( 'lodash' );

module.exports = {
  method: 'POST',
  path: '/users',
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
