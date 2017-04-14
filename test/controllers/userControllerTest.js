'use strict'
const userController = require('../../controllers/usersController')
const util = require('express-test-util')
const userModel = require('../../models/').user
let userModelStub
const Q = require('q')
let req
let res

describe('User Controller', () => {
  describe('# get all', () => {
    beforeEach(() => {
      userModelStub = sandbox.stub(userModel, 'findAll')
      req = util.mockRequest({ params: { id: 1 } })
      res = util.mockResponse()
      sandbox.stub(res, 'send')
    })

    afterEach(() => {
      sandbox.restore()
    })

    it('should return an error if no users was found', () => {
      userModelStub.returns(Q.resolve([]))
      userController.getAll(req, res)
      .fail((err) => {
        expect(userModelStub).to.have.been.calledOnce()
        expect(userModelStub).to.have.been.calledWith({ raw: true })
        expect(err).to.deep.equal(new Error('Could not find any users'))
      })
    })

    it('should return an array of users', () => {
      userModelStub.returns(Q.resolve([{ test: 'foo' }]))
      return userController.getAll(req, res)
      .then(() => {
        expect(userModelStub).to.have.been.calledOnce()
        expect(userModelStub).to.have.been.calledWith({ raw: true })
        expect(res.send).to.be.calledWith([{ test: 'foo' }])
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
      req = util.mockRequest({ params: { id: 1 } })
      res = util.mockResponse()
      sandbox.stub(res, 'send')
    })

    afterEach(() => {
      sandbox.restore()
    })

    it('should return an empty array if no users was found', () => {
      userModelStub.returns(Q.resolve([]))
      return userController.get(req, res)
      .then(() => {
        expect(userModelStub).to.have.been.calledOnce()
        expect(userModelStub).to.have.been.calledWith({ where: {
          id: 1
        },
          raw: true })
        expect(res.send).to.be.calledWith([])
      })
    })

    it('should return a single user', () => {
      userModelStub.returns(Q.resolve([{ test: 'foo' }]))
      return userController.get(req, res)
      .then((results) => {
        expect(userModelStub).to.have.been.calledOnce()
        expect(userModelStub).to.have.been.calledWith({
          where: {
            id: 1
          },
          raw: true })
        expect(res.send).to.be.calledWith([{ test: 'foo' }])
      })
    })
  })

  describe('# update', () => {
    beforeEach(() => {
      userModelStub = sandbox.stub(userModel, 'update')
      const data = {
        forename: 'newtest',
        surname: 'newtest',
        createdOn: 'newtest',
        email: 'test@test.com'
      }
      req = util.mockRequest({ params: { id: 1 }, body: data })
      res = util.mockResponse()
      sandbox.stub(res, 'send')
    })

    afterEach(() => {
      sandbox.restore()
    })

    it('should return [0] is there was no user found to update', () => {
      userModelStub.returns(Q.resolve([0]))

      return userController.update(req, res)
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
        expect(res.send).to.be.calledWith([0])
      })
    })

    it('should return the updated user', () => {
      const expectedData = {
        id: 1,
        forename: 'newtest',
        surname: 'newtest',
        createdOn: 'newtest',
        email: 'test@test.com'
      }
      userModelStub.returns(Q.resolve([expectedData]))
      return userController.update(req, res)
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
        expect(res.send).to.be.calledWith([expectedData])
      })
    })

    it('should return an error if the update fails', () => {
      userModelStub.returns(Q.reject('something went wrong'))
      return userController.update(req, res)
      .fail((error) => {
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
        expect(error).to.deep.equal('something went wrong')
      })
    })
  })

  describe('# delete', () => {
    beforeEach(() => {
      userModelStub = sandbox.stub(userModel, 'destroy')
      req = util.mockRequest({ params: { id: 1 } })
      res = util.mockResponse()
      sandbox.stub(res, 'send')
    })

    afterEach(() => {
      sandbox.restore()
    })

    it('should return an empty object if no user was found to remove', () => {
      userModelStub.returns(Q.resolve({}))
      return userController.delete(req, res)
      .then((result) => {
        expect(userModelStub).to.have.been.calledOnce()
        expect(userModelStub).to.have.been.calledWith({ where: {
          id: 1
        } })
        expect(res.send).to.be.calledWith(new Error('Error: Cannot Delete User with id: 1'))
      })
    })

    it('should return 1 if the delete was successful', () => {
      userModelStub.returns(Q.resolve(1))
      return userController.delete(req, res)
      .then((result) => {
        expect(userModelStub).to.have.been.calledOnce()
        expect(userModelStub).to.have.been.calledWith({ where: {
          id: 1
        } })
        expect(res.send).to.be.calledWith()
      })
    })

    it('shoud return an error if the delete fails', () => {
      userModelStub.returns(Q.reject('delete failed'))
      return userController.delete(req, res)
      .fail((err) => {
        expect(userModelStub).to.have.been.calledOnce()
        expect(userModelStub).to.have.been.calledWith({ where: {
          id: 1
        } })
        expect(err).to.deep.equal('delete failed')
      })
    })
  })

  describe('# create', () => {
    beforeEach(() => {
      userModelStub = sandbox.stub(userModel, 'create')
      res = util.mockResponse()
      sandbox.stub(res, 'send')
    })

    afterEach(() => {
      sandbox.restore()
    })

    it('should return an error if an incorrect emial was passed in', () => {
      req = util.mockRequest({ body: {
        forename: 'newtest',
        surname: 'newtest',
        createdOn: 'newtest',
        email: 'testtest.com'
      }})
      userModelStub.returns(Q.reject('Error: Validation error: Must be a valid email address'))

      const data = {
        forename: 'newtest',
        surname: 'newtest',
        createdOn: 'newtest',
        email: 'testtest.com'
      }
      return userController.create(req, res)
      .fail((result) => {
        expect(userModelStub).to.have.been.calledOnce()
        expect(userModelStub).to.have.been.calledWith(data)
        expect(result).to.deep.equal('Error: Validation error: Must be a valid email address')
      })
    })

    it('should return the new user if the create was successful', () => {
      const date = new Date()
      req = util.mockRequest({ body: {
        forename: 'newtest',
        surname: 'newtest',
        createdOn: 'newtest',
        email: 'test@test.com',
        date: date
      }})

      const expectedData = {
        id: 1,
        forename: 'newtest',
        surname: 'newtest',
        createdOn: date,
        email: 'testEmail'
      }

      userModelStub.returns(Q.resolve(expectedData))
      return userController.create(req, res)
      .then((result) => {
        expect(userModelStub).to.have.been.calledOnce()
        expect(userModelStub).to.have.been.calledWith({
          forename: 'newtest',
          surname: 'newtest',
          createdOn: 'newtest',
          email: 'test@test.com',
          date: date
        })
        expect(res.send).to.be.calledWith(expectedData)
      })
    })
  })
})
