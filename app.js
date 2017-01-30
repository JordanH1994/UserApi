'use strict';
let app = require('express')();
const logger = require('morgan');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const config = require('./config/config')();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  info: {
    title: 'Node Users API',
    version: '1.0.0',
    description: 'CURD API using sequalize and express'
  },
  host: 'localhost:3500',
  basePath: '/'
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*.js']
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(require('express').static('./public'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(config.port, () => {
  console.log('Any Data passed into this application will be lost on exit');
  console.log('Express server listening on port ' + config.port);
});

// swagger definition
module.exports = app;
