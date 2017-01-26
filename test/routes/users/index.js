'use strict';
var Q = require('q');
var User = require('../../../routes/users/index');
describe('Routes', function() {
  beforeEach(function() {
    sandbox.restore();
  });
  describe('GET All Users', function() {
    beforeEach(function() {
      sandbox.stub(User, 'getAll').returns(Q.resolve({ data: 'passing' }));
    });

    it('should respond', function(done) {
      var req, res;
      res = {
        send: sinon.spy()
      };
      User.getAll(req, res);
      expect(User.getAll).to.have.been.calledOnce();
      // expect(User.getAll).to.have.been.calledOnce();
      done();
    });
  });
});
