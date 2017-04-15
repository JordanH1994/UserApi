'use strict'

describe('Configuration setup', () => {
  it('should load local configurations', (done) => {
    const config = require('../../config/config')('development')
    expect(config.mode).to.equal('development')
    done()
  })
  it('should load staging configurations', (done) => {
    const config = require('../../config/config')('staging')
    expect(config.mode).to.equal('staging')
    done()
  })
  it('should load production configurations', (done) => {
    const config = require('../../config/config')()
    expect(config.mode).to.equal('production')
    done()
  })
})
