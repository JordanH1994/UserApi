'use strict'
const Q = require('q')
const usersController = require('../../../controllers/usersController')
const controller = require('../../../routes/users/get')
let getAllStub
let getOneStub
let request = {}
describe('Routes::Users::Get', () => {
  beforeEach(() => {
    getAllStub = sandbox.stub(usersController, 'getAll')
    getOneStub = sandbox.stub(usersController, 'get')
  })
  afterEach(() => {
    sandbox.restore()
  })

  it('should call the get all controller if no id was passed in', () => {
    request = {
      params: {

      }
    }
    getAllStub.returns(Q.resolve([{ test: 'foo' }]))
    controller.handler(request, (res) => {
      expect(getAllStub).to.be.calledOnce()
      expect(res).to.deep.equal([{ test: 'foo' }])
    })
  })

  context('should call the get controller if an id was passed in', () => {
    it('and if a user was found it should return an object representing a user', () => {
      request = {
        params: {
          id: 1
        }
      }
      getOneStub.returns(Q.resolve({ test: 'foo' }))
      controller.handler(request, (res) => {
        expect(getOneStub).to.be.calledOnce()
        expect(res).to.deep.equal({ test: 'foo' })
      })
    })

    it('and if a user was not found it should return a 404 error', () => {
      request = {
        params: {
          id: 1
        }
      }
      getOneStub.returns(Q.resolve())
      controller.handler(request, (res) => {
        return {
          code: (statusCode) => {
            expect(getOneStub).to.be.calledOnce()
            expect(res).to.be.empty()
            expect(statusCode).to.equal(201)
          }
        }
      })
    })
  })
})
