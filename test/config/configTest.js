'use strict'

describe('Configuration setup', () => {
  it('should load local configurations', (done) => {
    var config = require('../../config/config')('development')
    expect(config.mode).to.equal('development')
    expect(config).to.have.deep.property('database')
    done()
  })
  it('should load staging configurations', (done) => {
    var config = require('../../config/config')('staging')
    expect(config.mode).to.equal('staging')
    expect(config).to.have.deep.property('database')
    done()
  })
  it('should load production configurations', (done) => {
    var config = require('../../config/config')()
    expect(config.mode).to.equal('production')
    expect(config).to.have.deep.property('database')
    done()
  })
})
