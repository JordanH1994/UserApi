'use strict';

describe('Configuration setup', function() {
  it('should load local configurations', function(done) {
    var config = require('../../config/config')();
    expect(config.mode).to.equal('development');
    expect(config).to.have.deep.property('database');
    done();
  });
  it('should load staging configurations', function(done) {
    var config = require('../../config/config')('staging');
    expect(config.mode).to.equal('staging');
    expect(config).to.have.deep.property('database');
    done();
  });
  it('should load production configurations', function(done) {
    var config = require('../../config/config')('production');
    expect(config.mode).to.equal('production');
    expect(config).to.have.deep.property('database');
    done();
  });
});
