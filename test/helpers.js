'use strict'

const chai = require('chai')
global.expect = chai
  .use(require('chai-as-promised'))
  .use(require('dirty-chai'))
  .use(require('sinon-chai'))
  .use(require('chai-http'))
  .expect
global.chai = chai
global.should = chai.should()
global.sinon = require('sinon')
global.sandbox = sinon.sandbox.create()
