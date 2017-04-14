'use strict'
const config = require('./config/config')()
const Hapi = require('hapi')
const recursiveReadSync = require('recursive-readdir-sync')
const _ = require('lodash')
const path = require('path')
const server = new Hapi.Server()
// Figure out where everything is going to be
const __BASE = path.join(path.resolve(), '/')

server.connection({ port: config.port, host: 'localhost' })

server.start((err) => {
  const files = recursiveReadSync(__BASE + 'routes')
  _.forEach(files, (file) => {
    try {
      server.route(require(file))
    } catch (error) {
      // if any controllers have an error we want to display it and then kill the node process
      console.log ('Error Setting up route ' + file, error)
      process.exit(1)
    }
  })
  if (err) {
    throw err
  }
  console.log(`Server running at: ${server.info.uri}`)
})

// app.use('/users', users)
// // expose swagger.json
// app.get('/swagger.json', (req, res) => {
//   res.setHeader('Content-Type', 'application/json')
//   res.send(swaggerSpec)
// })

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// // catch 404 and forward to error handler
// app.use((req, res, next) => {
//   var err = new Error('Not Found')
//   err.status = 404
//   next(err)
// })

// // error handler
// app.use((err, req, res) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message
//   res.locals.error = process.env.NODE_ENV === 'development' ? err : {}

//   // render the error page
//   res.status(err.status || 500)
//   res.render('error')
// })

// app.listen(config.port, () => {
//   console.log('Any Data passed into this application will be lost on exit')
//   console.log('Express server listening on port ' + config.port)
// })

// // swagger definition
// module.exports = app
