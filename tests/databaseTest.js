/* global describe it */
let expect = require('chai').use(require('sinon-chai')).use(require('dirty-chai')).use(require('sinon-chai')).expect
let database = require('database')
let sinon = require('sinon')

describe('database.js', () => {
  context('connecting to the database', () => {
    beforeEach(() => {
      let callback = sinon.spy()
      database.setUp(callback)
    })
    it('should return true if the connection is succeessful', () => {
      expect(callback).to.be.calledOnce()
    })
  })
})
