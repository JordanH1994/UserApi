'use strict'

const chai = require('chai')
global.expect = chai
  .use(require('chai-as-promised'))
  .use(require('dirty-chai'))
  .use(require('sinon-chai'))
  .expect
global.chai = chai
global.should = chai.should()
global.sinon = require('sinon')
global.sandbox = sinon.sandbox.create()
process.env.DATABASE_URL = 'postgres://api:api@localhost:5432/api'
