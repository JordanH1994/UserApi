'use strict';
var userController = require('../../controllers/usersController');
var userModel = require('../../models/').user;
var userModelStub;
var Q = require('q');
describe('User Controller', function() {

  describe('#_get all', function() {
    beforeEach(function() {
      userModelStub = sandbox.stub(userModel, 'findAll');
    });

    afterEach(function() {
      sandbox.restore();
    });

    it('should return an error if no users was found', function() {
      userModelStub.returns(Q.resolve([]));
      return userController.getAll()
      .fail(function(err) {
        expect(userModelStub).to.have.been.calledOnce();
        expect(userModelStub).to.have.been.calledWith({ raw: true });
        expect(err).to.deep.equal(new Error('Could not find any users'));
      });
    });

    it('should return an array of users', function() {
      userModelStub.returns(Q.resolve([{ test: 'foo' }]));
      return userController.getAll()
      .then(function(results) {
        expect(userModelStub).to.have.been.calledOnce();
        expect(userModelStub).to.have.been.calledWith({ raw: true });
        expect(results).to.deep.equal([{ test: 'foo' }]);
      });
    });

    it('should return an error if it fails', function() {
      userModelStub.returns(Q.reject('lookup reject'));
      return userController.getAll()
      .fail(function(error) {
        expect(userModelStub).to.have.been.calledOnce();
        expect(userModelStub).to.have.been.calledWith({ raw: true });
        expect(error).to.deep.equal( new Error('Error retrieving users.lookup reject]'));
      });
    });
  });

  describe('#_get one', function() {
    beforeEach(function() {
      userModelStub = sandbox.stub(userModel, 'find');
    });

    afterEach(function() {
      sandbox.restore();
    });

    it('should return an error if no users was found', function() {
      userModelStub.returns(Q.reject([]));
      return userController.get(1)
      .fail(function(err) {
        expect(userModelStub).to.have.been.calledOnce();
        expect(userModelStub).to.have.been.calledWith({ where: {
          id: 1
        },
          raw: true });
        expect(err).to.deep.equal(new Error('error retrieving user.'));
      });
    });

    it('should return a single user', function() {
      userModelStub.returns(Q.resolve([{ test: 'foo' }]));
      return userController.get(1)
      .then(function(results) {
        expect(userModelStub).to.have.been.calledOnce();
        expect(userModelStub).to.have.been.calledWith( {
          where: {
            id: 1
          },
          raw: true });
        expect(results).to.deep.equal([{ test: 'foo' }]);
      });
    });
  });

  describe('#_update', function() {
    beforeEach(function() {
      userModelStub = sandbox.stub(userModel, 'update');
    });

    afterEach(function() {
      sandbox.restore();
    });

    it('should return [0] is there was no user found to update', function() {
      userModelStub.returns(Q.resolve([0]));
      var data = {
        forname: 'newtest',
        surname: 'newtest',
        createdOn: 'newtest',
        email: 'test@test.com'
      };

      return userController.update(1, data)
      .then(function(result) {
        expect(userModelStub).to.have.been.calledOnce();
        expect(userModelStub).to.have.been.calledWith(data, { where: {
          id: 1
        },
          returning: true });
        expect(result).to.deep.equal([0]);
      });
    });

    it('should return the updated user', function() {
      var expectedData = {
        id: 1,
        forname: 'newtest',
        surname: 'newtest',
        createdOn: 'newtest',
        email: 'test@test.com'
      };
      var data = {
        forname: 'newtest',
        surname: 'newtest',
        createdOn: 'newtest',
        email: 'test@test.com'
      };
      userModelStub.returns(Q.resolve([expectedData]));
      return userController.update(1, data)
      .then(function(results) {
        expect(userModelStub).to.have.been.calledOnce();
        expect(userModelStub).to.have.been.calledWith(data, { where: {
          id: 1
        },
          returning: true });
        expect(results).to.deep.equal([expectedData]);
      });
    });

    it('should return an error if the update fails', function() {
      var data = {
        forname: 'newtest',
        surname: 'newtest',
        createdOn: 'newtest'
      };
      userModelStub.returns(Q.reject('something went wrong'));
      return userController.update(1, data)
      .fail(function(error) {
        expect(userModelStub).to.have.been.calledOnce();
        expect(userModelStub).to.have.been.calledWith(data, { where: {
          id: 1
        },
          returning: true });
        expect(error).to.deep.equal('something went wrong');
      });
    });
  });

  describe('#_delete', function() {
    beforeEach(function() {
      userModelStub = sandbox.stub(userModel, 'destroy');
    });

    afterEach(function() {
      sandbox.restore();
    });

    it('should return an empty object if no user was found to remove', function() {
      userModelStub.returns(Q.resolve({}));
      return userController.delete(1)
      .then(function(result) {
        expect(userModelStub).to.have.been.calledOnce();
        expect(userModelStub).to.have.been.calledWith({ where: {
          id: 1
        } });
        expect(result).to.deep.equal({});
      });
    });

    it('should return 1 if the delete was successful', function() {
      userModelStub.returns(Q.resolve(1));
      return userController.delete(1)
      .then(function(result) {
        expect(userModelStub).to.have.been.calledOnce();
        expect(userModelStub).to.have.been.calledWith({ where: {
          id: 1
        } });
        expect(result).to.deep.equal(1);
      });
    });

    it('shoud return an error if the delete fails', function() {
      userModelStub.returns(Q.reject('delete failed'));
      return userController.delete(1)
      .fail(function(err) {
        expect(userModelStub).to.have.been.calledOnce();
        expect(userModelStub).to.have.been.calledWith({ where: {
          id: 1
        } });
        expect(err).to.deep.equal('delete failed');
      });
    });
  });

  describe('#_create', function() {
    beforeEach(function() {
      userModelStub = sandbox.stub(userModel, 'create');
    });

    afterEach(function() {
      sandbox.restore();
    });

    it('should return an error if an incorrect emial was passed in', function() {
      userModelStub.returns(Q.reject('Error: Validation error: Must be a valid email address'));

      var data = {
        forname: 'newtest',
        surname: 'newtest',
        createdOn: 'newtest',
        email: 'testtest.com'
      };

      return userController.create(data)
      .fail(function(result) {
        expect(userModelStub).to.have.been.calledOnce();
        expect(userModelStub).to.have.been.calledWith(data);
        expect(result).to.deep.equal('Error: Validation error: Must be a valid email address');
      });
    });

    it('should return the new user if the create was successful', function() {
      var date = new Date();
      var expectedData = {
        id: 1,
        forname: 'newtest',
        surname: 'newtest',
        createdOn: date,
        email: 'testEmail'
      };
      var data = {
        forname: 'newtest',
        surname: 'newtest',
        email: 'testEmail',
        createdOn: date
      };
      userModelStub.returns(Q.resolve(expectedData));
      return userController.create(data)
      .then(function(result) {
        expect(userModelStub).to.have.been.calledOnce();
        expect(userModelStub).to.have.been.calledWith(data);
        expect(result).to.deep.equal(expectedData);
      });
    });

    // it('shoud return an error if the delete fails', function() {
    //   userModelStub.returns(Q.reject('delete failed'));
    //   return userController.delete(1)
    //   .fail(function(err) {
    //     expect(userModelStub).to.have.been.calledOnce();
    //     expect(userModelStub).to.have.been.calledWith({ where: {
    //       id: 1
    //     } });
    //     expect(err).to.deep.equal('delete failed');
    //   });
    // });
  });
});
