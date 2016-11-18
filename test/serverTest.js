'use strict';
const expect = require('chai')
  .use(require('dirty-chai'))
  .use(require('sinon-chai'))
  .expect;
let chai = require('chai');
const server = require('../server');
let sinon = require('sinon');
chai.use( require('chai-http') );
let should = chai.should();
let db = require('../database');


describe('server start', () => {
  describe('/GET endpoints', () => {
    context('should expose endpoints at', () => {
      
      it(' /', (done) => {
        done();
      });

      it('/getAll', (done) => {
        done();
      });

      it('search', (done) => {
        done();
      });
    });
  });
  describe('/POST endpoints', () =>{
    context('should expose endpoints at ', () =>{
      it('update', (done) => {
        done();
      });
      it('insert', (done) => {
        done();
      });

      it('delete', (done) => {
        done();
      });
    })
  });
});
