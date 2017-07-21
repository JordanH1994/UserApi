'use strict'
const config = require('./config/config')()
const Hapi = require('hapi')
const recursiveReadSync = require('recursive-readdir-sync')
const _ = require('lodash')
const path = require('path')
const server = new Hapi.Server()
const __BASE = path.join(path.resolve(), '/')
const pkg = require('./package')
const Inert = require('inert')
const Vision = require('vision')
server.connection({ port: process.env.PORT || config.port })

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

server.register([
  Inert,
  Vision,
  {
    register: require('hapi-swagger'),
    options: {
      info: {
        title: 'Test API Documentation',
        version: pkg.version
      },
      documentationPath: '/'
    }
  }], (err) => {
  if (err) return console.log(err)
  server.start((err) => {
    if (err) {
      console.error(err)
    }
    console.log(`Server running at: ${server.info.uri}`)
  })
})
