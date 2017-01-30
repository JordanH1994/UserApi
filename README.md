# Node.js User API
An API to manage a user persistence layer

## Implementation

* The API exposes a user model with the following properties: id, email, forename, surname, date created
* The following endpoints are exposed: create, read, update, delete
* Can be consumed using Google Chrome's Postman. See repo for User_API.postman_collection file, which can be imported by Postman
* Input is validated and sanitised with sequalize's build in vailidation

## Installation
1. Insall node version `v6.7.0`
2. App dependencies - `npm install`
3. [PostGres](https://www.postgresql.org/) - to allow user data to be persisted the app requires a connection to an instance of PostGres SQL. The local connection string is specified in the config.js file.

## Usage
To get the Node.js server running you should only need to:

On the first time starting the scripts will create an user and a database to use for storing, reading, writing, and deleting 'user' information
1. To start the Node.js server run `npm start`

Unit tests can run using `npm test`.
