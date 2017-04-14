'use strict'
const userController = require('../../controllers/usersController')
const userModel = require('../../models/').user
let userModelStub
const Q = require('q')

describe('User Controller', () => {
  describe('# get all', () => {
    beforeEach(() => {
      userModelStub = sandbox.stub(userModel, 'findAll')
    })

    afterEach(() => {
      sandbox.restore()
    })

    it('should return an error if no users was found', () => {
      userModelStub.returns(Q.resolve([]))
      userController.getAll()
      .fail((err) => {
        expect(userModelStub).to.have.been.calledOnce()
        expect(userModelStub).to.have.been.calledWith({ raw: true })
        expect(err).to.deep.equal(new Error('Could not find any users'))
      })
    })

    it('should return an array of users', () => {
      userModelStub.returns(Q.resolve([{ test: 'foo' }]))
      return userController.getAll()
      .then((users) => {
        expect(userModelStub).to.have.been.calledOnce()
        expect(userModelStub).to.have.been.calledWith({ raw: true })
        expect(users).to.deep.equal([{ test: 'foo' }])
      })
    })

    it('should return an error if it fails', () => {
      userModelStub.returns(Q.reject('lookup reject'))
      return userController.getAll()
      .fail((error) => {
        expect(userModelStub).to.have.been.calledOnce()
        expect(userModelStub).to.have.been.calledWith({ raw: true })
        expect(error).to.deep.equal('lookup reject')
      })
    })
  })

  describe('# get one', () => {
    beforeEach(() => {
      userModelStub = sandbox.stub(userModel, 'find')
    })

    afterEach(() => {
      sandbox.restore()
    })

    it('should return an empty array if no users was found', () => {
      userModelStub.returns(Q.resolve([]))
      return userController.get(1)
      .then((res) => {
        expect(userModelStub).to.have.been.calledOnce()
        expect(userModelStub).to.have.been.calledWith({ where: {
          id: 1
        },
          raw: true })
        expect(res).to.deep.equal([])
      })
    })

    it('should return a single user', () => {
      userModelStub.returns(Q.resolve([{ test: 'foo' }]))
      return userController.get(1)
      .then((results) => {
        expect(userModelStub).to.have.been.calledOnce()
        expect(userModelStub).to.have.been.calledWith({
          where: {
            id: 1
          },
          raw: true })
        expect(results).to.deep.equal([{ test: 'foo' }])
      })
    })
  })

  describe('# update', () => {
    beforeEach(() => {
      userModelStub = sandbox.stub(userModel, 'update')
    })

    afterEach(() => {
      sandbox.restore()
    })

    it('should return [0] is there was no user found to update', () => {
      userModelStub.returns(Q.resolve([0]))
      const data = {
        forename: 'newtest',
        surname: 'newtest',
        createdOn: 'newtest',
        email: 'test@test.com'
      }
      return userController.update(1, data)
      .then((result) => {
        expect(userModelStub).to.have.been.calledOnce()
        expect(userModelStub).to.have.been.calledWith({
          forename: 'newtest',
          surname: 'newtest',
          createdOn: 'newtest',
          email: 'test@test.com'
        }, {
          where: {
            id: 1
          },
          returning: true })
        expect(result).to.deep.equal([0])
      })
    })

    it('should return the updated user', () => {
      const user = {
        forename: 'newtest',
        surname: 'newtest',
        createdOn: 'newtest',
        email: 'test@test.com'
      }
      const expectedData = {
        id: 1,
        forename: 'newtest',
        surname: 'newtest',
        createdOn: 'newtest',
        email: 'test@test.com'
      }
      userModelStub.returns(Q.resolve([expectedData]))
      return userController.update(1, user)
      .then((results) => {
        expect(userModelStub).to.have.been.calledOnce()
        expect(userModelStub).to.have.been.calledWith({
          forename: 'newtest',
          surname: 'newtest',
          createdOn: 'newtest',
          email: 'test@test.com'
        }, {
          where: {
            id: 1
          },
          returning: true })
        expect(results).to.deep.equal([expectedData])
      })
    })
  })

  describe('# delete', () => {
    beforeEach(() => {
      userModelStub = sandbox.stub(userModel, 'destroy')
    })

    afterEach(() => {
      sandbox.restore()
    })

    it('should return 0 if no user was found to remove', () => {
      userModelStub.returns(Q.resolve(0))
      return userController.delete(1)
      .then((result) => {
        expect(userModelStub).to.have.been.calledOnce()
        expect(userModelStub).to.have.been.calledWith({ where: {
          id: 1
        } })
        expect(result).to.equal(0)
      })
    })

    it('should return 1 if the delete was successful', () => {
      userModelStub.returns(Q.resolve(1))
      return userController.delete(1)
      .then((result) => {
        expect(userModelStub).to.have.been.calledOnce()
        expect(userModelStub).to.have.been.calledWith({ where: {
          id: 1
        } })
        expect(result).to.equal(1)
      })
    })
  })

  describe('# create', () => {
    beforeEach(() => {
      userModelStub = sandbox.stub(userModel, 'create')
    })

    afterEach(() => {
      sandbox.restore()
    })

    it('should return an error if an incorrect emial was passed in', () => {
      userModelStub.returns(Q.reject('Error: Validation error: Must be a valid email address'))
      const data = {
        forename: 'newtest',
        surname: 'newtest',
        email: 'testtest.com'
      }

      return userController.create(data)
      .fail((result) => {
        expect(userModelStub).to.have.been.calledOnce()
        expect(userModelStub).to.have.been.calledWith(data)
        expect(result).to.deep.equal('Error: Validation error: Must be a valid email address')
      })
    })

    it('should return the new user if the create was successful', () => {
      const expectedData = {
        id: 1,
        forename: 'newtest',
        surname: 'newtest',
        email: 'testEmail'
      }
      const data = {
        forename: 'newtest',
        surname: 'newtest',
        email: 'test@test.com'
      }

      userModelStub.returns(Q.resolve(expectedData))
      return userController.create(data)
      .then((result) => {
        expect(userModelStub).to.have.been.calledOnce()
        expect(userModelStub).to.have.been.calledWith({
          forename: 'newtest',
          surname: 'newtest',
          email: 'test@test.com'
        })
        expect(result).to.deep.equal(expectedData)
      })
    })
  })
})
