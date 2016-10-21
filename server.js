'use strict';
const app = require('express')();
const bodyParser = require('body-parser');
const databaseHandler = require('./database.js');
const path = require('path');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

let config = require('./.databaseConfig');
let dbConnectionConfig = { host: config.db.host, user: config.db.username, password: config.db.password, database: config.db.database };

databaseHandler.setup(dbConnectionConfig, (err, res) => {
  if (err) return console.log(err);
  app.listen(3000, () => {
    console.log('listening on port 3000');
    console.log('any information inserted into this program will be removed when the program stops');
  });
});

app.use(require('express').static('views'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

// app.get('/getAll', (req, res) => {
//   databaseHandler.getAllUsers((err, result) => {
//     if (err) return console.log(err);
//     res.render('viewInfo.ejs', { user_info: result });
//   });
// });

// // do a search by forename
// app.get('/search', (req, res) => {
// // having _ as a default value being passed into the sql to say  Any single character
//   let params = {
//     forename: req.query.forename.toLowerCase() || '_',
//     surename: req.query.surename.toLowerCase() || '_'
//   };
//   databaseHandler.search(params, (err, result) => {
//     if (err) return console.log(err);
//     res.render('viewInfo.ejs', { user_info: result });
//   });
// });

// app.post('/insert', (req, res) => {
//   let params = {
//     forename: req.body.first_name.toLowerCase(),
//     surename: req.body.last_name.toLowerCase(),
//     email: req.body.email.toLowerCase()
//   };
//   databaseHandler.insertUser(params, (err, result) => {
//     if (err) return console.log(err);
//     res.redirect('/');
//   });
// });

// // had to do the update via post as put didn't want to work
// app.post('/update', (req, res) => {
//   let paramsToSearch = {
//     forename: req.body.search_user_first_name.toLowerCase(),
//     surename: req.body.search_user_last_name.toLowerCase()
//   };
//   let paramsToUpdate = {
//     forename: req.body.update_user_first_name.toLowerCase(),
//     surename: req.body.update_user_last_name.toLowerCase(),
//     email: req.body.update_user_email.toLowerCase()
//   };
//   databaseHandler.updateUser(paramsToUpdate, paramsToSearch, (err, result) => {
//     if (err) return console.log(err);
//   });
// });

// // had to do the delete via post as doing app.delete didn't want to work
// app.post('/delete', (req, res) => {
//   let params = {
//     forename: req.body.first_name.toLowerCase(),
//     surename: req.body.last_name.toLowerCase()
//   };
//   databaseHandler.deleteUser(params, (err, result) => {
//     if (err) return console.log(err);
//     return res.redirect('/');
//   });
// });
