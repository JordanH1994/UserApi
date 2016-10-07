let chai = require('chai')
const expect = require('chai')
  .use(require('dirty-chai'))
  .use(require('sinon-chai'))
  .expect;
let database = require('../database')
let sinon = require('sinon')
let sandbox = sinon.sandbox.create();

describe('database', () => {
  
  describe('connecting', () => {

    let DBWrapper = require('node-dbi').DBWrapper
    let dbWrapper
    beforeEach(() => {
      dbWrapper = new DBWrapper('pg', '')
      sandbox.stub(dbWrapper, 'connect');
    });

    afterEach(() => {
      sandbox.restore();
    });
    context('errors', , () => {
      beforeEach(() => {
        dbWrapper.connect.yields('Something went wrong' )
      });
      it('should return an error when incorrect info is passed in', (done) => {
        database.setup('', (err, res) => {
          expect(err).to.equal('Something went wrong')
          expect(res).to.be.null()
          done()
        })
      })
    })
    it('should return true when it connected', (done) => {
      beforeEach(() => {
        dbWrapper.connect.yields(true )
      });
      database.setup('', (err, res) => {
        expect(res).to.be.true()
        done()
      })
    })
  })
})