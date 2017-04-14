'use strict'
const usersController = require('../../controllers/usersController')

module.exports = {
  method: 'GET',
  path: '/users/read/',
  config: {
    description: 'Get all stored Users',
    tags: ['api', 'Users'],
    validate: {
      options: {
        allowUnknown: true
      }
    }
  },
  handler: (request, reply) => {
    return usersController.getAll()
    .then((users) => {
      return reply({users: users})
    })
  }
}
