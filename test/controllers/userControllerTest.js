'use strict';
const userController = require('../../controllers/usersController');
const userModel = require('../../models/').user;
let userModelStub;
const Q = require('q');
describe('User Controller', () => {

  describe('# get all', () => {
    beforeEach(() => {
      userModelStub = sandbox.stub(userModel, 'findAll');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return an error if no users was found', () => {
      userModelStub.returns(Q.resolve([]));
      return userController.getAll()
      .fail((err) => {
        expect(userModelStub).to.have.been.calledOnce();
        expect(userModelStub).to.have.been.calledWith({ raw: true });
        expect(err).to.deep.equal(new Error('Could not find any users'));
      });
    });

    it('should return an array of users', () => {
      userModelStub.returns(Q.resolve([{ test: 'foo' }]));
      return userController.getAll()
      .then((results) => {
        expect(userModelStub).to.have.been.calledOnce();
        expect(userModelStub).to.have.been.calledWith({ raw: true });
        expect(results).to.deep.equal([{ test: 'foo' }]);
      });
    });

    it('should return an error if it fails', () => {
      userModelStub.returns(Q.reject('lookup reject'));
      return userController.getAll()
      .fail((error) => {
        expect(userModelStub).to.have.been.calledOnce();
        expect(userModelStub).to.have.been.calledWith({ raw: true });
        expect(error).to.deep.equal( new Error('Error retrieving users.lookup reject]'));
      });
    });
  });

  describe('# get one', () => {
    beforeEach(() => {
      userModelStub = sandbox.stub(userModel, 'find');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return an error if no users was found', () => {
      userModelStub.returns(Q.reject([]));
      return userController.get(1)
      .fail((err) => {
        expect(userModelStub).to.have.been.calledOnce();
        expect(userModelStub).to.have.been.calledWith({ where: {
          id: 1
        },
          raw: true });
        expect(err).to.deep.equal(new Error('error retrieving user.'));
      });
    });

    it('should return a single user', () => {
      userModelStub.returns(Q.resolve([{ test: 'foo' }]));
      return userController.get(1)
      .then((results) => {
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

  describe('# update', () => {
    beforeEach(() => {
      userModelStub = sandbox.stub(userModel, 'update');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return [0] is there was no user found to update', () => {
      userModelStub.returns(Q.resolve([0]));
      var data = {
        forname: 'newtest',
        surname: 'newtest',
        createdOn: 'newtest',
        email: 'test@test.com'
      };

      return userController.update(1, data)
      .then((result)  => {
        expect(userModelStub).to.have.been.calledOnce();
        expect(userModelStub).to.have.been.calledWith(data, { where: {
          id: 1
        },
          returning: true });
        expect(result).to.deep.equal([0]);
      });
    });

    it('should return the updated user', () => {
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
      .then((results) => {
        expect(userModelStub).to.have.been.calledOnce();
        expect(userModelStub).to.have.been.calledWith(data, { where: {
          id: 1
        },
          returning: true });
        expect(results).to.deep.equal([expectedData]);
      });
    });

    it('should return an error if the update fails', () => {
      var data = {
        forname: 'newtest',
        surname: 'newtest',
        createdOn: 'newtest'
      };
      userModelStub.returns(Q.reject('something went wrong'));
      return userController.update(1, data)
      .fail((error) => {
        expect(userModelStub).to.have.been.calledOnce();
        expect(userModelStub).to.have.been.calledWith(data, { where: {
          id: 1
        },
          returning: true });
        expect(error).to.deep.equal('something went wrong');
      });
    });
  });

  describe('# delete', () => {
    beforeEach(() => {
      userModelStub = sandbox.stub(userModel, 'destroy');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return an empty object if no user was found to remove', () => {
      userModelStub.returns(Q.resolve({}));
      return userController.delete(1)
      .then((result) => {
        expect(userModelStub).to.have.been.calledOnce();
        expect(userModelStub).to.have.been.calledWith({ where: {
          id: 1
        } });
        expect(result).to.deep.equal({});
      });
    });

    it('should return 1 if the delete was successful', () => {
      userModelStub.returns(Q.resolve(1));
      return userController.delete(1)
      .then((result) => {
        expect(userModelStub).to.have.been.calledOnce();
        expect(userModelStub).to.have.been.calledWith({ where: {
          id: 1
        } });
        expect(result).to.deep.equal(1);
      });
    });

    it('shoud return an error if the delete fails', () => {
      userModelStub.returns(Q.reject('delete failed'));
      return userController.delete(1)
      .fail((err) => {
        expect(userModelStub).to.have.been.calledOnce();
        expect(userModelStub).to.have.been.calledWith({ where: {
          id: 1
        } });
        expect(err).to.deep.equal('delete failed');
      });
    });
  });

  describe('# create', () => {
    beforeEach(() => {
      userModelStub = sandbox.stub(userModel, 'create');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return an error if an incorrect emial was passed in', () => {
      userModelStub.returns(Q.reject('Error: Validation error: Must be a valid email address'));

      var data = {
        forname: 'newtest',
        surname: 'newtest',
        createdOn: 'newtest',
        email: 'testtest.com'
      };

      return userController.create(data)
      .fail((result) => {
        expect(userModelStub).to.have.been.calledOnce();
        expect(userModelStub).to.have.been.calledWith(data);
        expect(result).to.deep.equal('Error: Validation error: Must be a valid email address');
      });
    });

    it('should return the new user if the create was successful', () => {
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
      .then((result) => {
        expect(userModelStub).to.have.been.calledOnce();
        expect(userModelStub).to.have.been.calledWith(data);
        expect(result).to.deep.equal(expectedData);
      });
    });
  });
});
