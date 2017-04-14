'use strict'
const Q = require('q')
const usersController = require('../../../controllers/usersController')
const controller = require('../../../routes/users/getOne')
let getOneStub
let request = {}
describe('Routes::Users::Get', () => {
  beforeEach(() => {
    getOneStub = sandbox.stub(usersController, 'get')
  })
  afterEach(() => {
    sandbox.restore()
  })

  context('#Get', () => {
    it('should return a object representing a user if one was found', () => {
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

    it('should return a 404 error if a user was not found', () => {
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
