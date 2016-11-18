'use strict';
const app = require('express')();
const bodyParser = require('body-parser');
const databaseHandler = require('./database.js');
const path = require('path');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

let config = require('./.databaseConfig');
let dbConnectionConfig = {
  host: config.db.host,
  user: config.db.username,
  password: config.db.password,
  database: config.db.database
};

databaseHandler.setup(dbConnectionConfig, (err) => {
  if (err) return console.log(err);
  return app.listen(3000, () => {
    console.log('listening on port 3000');
    return console.log('any information inserted into this program will be removed when the program stops');

  });
});

app.use(require('express').static('views'));

app.get('/', (req, res) => {
  if (res.statusCode === 200){
    res.sendFile(path.join(__dirname, '/views/index.html'));
  }
});

app.get('/getAll', (req, res) => {
  return databaseHandler.getAllUsers((err, result) => {
    if (err) return console.log(err);
    return res.render('viewInfo.ejs', { user_info: result });
  });
});

// do a search by forename
app.get('/search', (req, res) => {
  let params = {
    forename: req.query.forename || '_',
    surename: req.query.surename || '_'
  };
  databaseHandler.search(params, (err, result) => {
    if (err) return console.log(err);
    return res.render('viewInfo.ejs', { user_info: result });
  });
});

app.post('/insert', (req, res) => {
  let params = {
    forename: req.body.first_name,
    surename: req.body.last_name,
    email: req.body.email
  };
  return databaseHandler.insertUser(params, (err, res) => {
    if (err) return console.log(err);
    return res.redirect('/');
  });
});

// had to do the update via post as put didn't want to work
app.post('/update', (req, res) => {
  let paramsToSearch = {
    forename: req.body.search_user_first_name,
    surename: req.body.search_user_last_name
  };
  let paramsToUpdate = {
    forename: req.body.update_user_first_name,
    surename: req.body.update_user_last_name,
    email: req.body.update_user_email
  };
  return databaseHandler.updateUser(paramsToUpdate, paramsToSearch, (err) => {
    if (err) return console.log(err);
    return res.redirect('/');
  });
});

// had to do the delete via post as doing app.delete didn't want to work
app.post('/delete', (req, res) => {
  let params = {
    forename: req.body.first_name,
    surename: req.body.last_name
  };
  databaseHandler.deleteUser(params, (err) => {
    if (err) return console.log(err);
    return res.redirect('/');
  });
});
