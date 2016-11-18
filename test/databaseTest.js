'use strict';
let chai = require('chai');
const expect = require('chai')
  .use(require('dirty-chai'))
  .use(require('sinon-chai'))
  .expect;
let database = require('../database');
let sinon = require('sinon');
let sandbox = sinon.sandbox.create();
let orm = require('orm');

describe.only('database', () => {
  beforeEach(function () {
    // Create a sandbox for the entire test suite
    sandbox = sinon.sandbox.create();
  });
  afterEach(function () {
    // Restore all the things made through the sandbox
    sandbox.restore();
  });

  context('connecting', () => {
    let connectSpy;
    beforeEach(() => {
      let db = {
        settings :{
          set: function ( string, bool){
          }
        },t
        define: function( str, ob){
        }
      }
      orm.connect = sandbox.stub().yields( null , db);
    });

    afterEach(() => {
    });

    it('when passing in correct connection info return true', (done) => {
      let config = require('../.databaseConfig');
      let dbConnectionConfig = {
        host: config.db.host,
        user: config.db.username,
        password: config.db.password,
        database: config.db.database,
        protocol: config.db.protocol
      };
      database.setup(dbConnectionConfig, (err, res) => {
        console.log(err);
        console.log(res);
        expect(err).to.be.null();
        expect(res).to.be.true();
        expect(connectSpy).to.have.been.calledOnce();
        expect(connectSpy).to.have.been.calledWithMatch(dbConnectionConfig);
        done();
      });
    });

    it('when passing in no connection in returns and error', (done) => {
      database.setup( null, (err, res) => {
        expect(err).to.equal('no connection params');
        expect(res).to.be.null();
        expect(connectSpy).to.have.not.been.called();
        done();
      });
    });

    it('when missing protocol it should thrown error missing protocol', (done) =>{
      let config = require('../.databaseConfig');
      let dbConnectionConfig = {
        host: config.db.host,
        user: config.db.username,
        password: config.db.password,
        database: config.db.database
      };
      database.setup(dbConnectionConfig, (err, res) => {
        expect(err.message).to.be.equal('CONNECTION_URL_NO_PROTOCOL');
        expect(res).to.be.null();
        expect(connectSpy).to.have.been.calledOnce();
        expect(connectSpy).to.have.been.calledWithMatch(dbConnectionConfig);
        done();
      });
    });
  });

  context('geting all users', () => {
    beforeEach(() => {

    });

    afterEach(() =>{

    });

    it('should return an array of objects')
  });
});
