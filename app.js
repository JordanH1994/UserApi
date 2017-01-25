'use strict';
var app = require('express')();
var logger = require('morgan');
var bodyParser = require('body-parser');
var models = require('./models');
var users = require('./routes/users');
var config = require('./config/config')();

// view engine setup

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

models.sequelize.sync().then(function() {
  app.listen(config.port, function() {
    console.log('Express server listening on port ' + config.port);
  });
});


module.exports = app;
