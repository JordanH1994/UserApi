'use strict'
const config = require('./config/config')()
const Hapi = require('hapi')
const recursiveReadSync = require('recursive-readdir-sync')
const _ = require('lodash')
const path = require('path')
const server = new Hapi.Server()
const __BASE = path.join(path.resolve(), '/')

server.connection({ port: config.port, host: 'localhost' })

const files = recursiveReadSync(__BASE + 'routes')
_.forEach(files, (file) => {
  try {
    server.route(require(file))
  } catch (error) {
    // if any controllers have an error we want to display it and then kill the node process
    console.log('Error Setting up route ' + file, error)
    process.exit(1)
  }
})

server.start((err) => {
  if (err) {
    throw err
  }
  console.log(`Server running at: ${server.info.uri}`)
})

// // expose swagger.json
// app.get('/swagger.json', (req, res) => {
//   res.setHeader('Content-Type', 'application/json')
//   res.send(swaggerSpec)
// })

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
