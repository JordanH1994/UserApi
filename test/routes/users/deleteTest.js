'use strict'
const Q = require('q')
const usersController = require('../../../controllers/usersController')
const controller = require('../../../routes/users/delete')
let deleteStub
let request = {}
const Boom = require('boom')
describe('Routes::Users::Delete', () => {
  beforeEach(() => {
    deleteStub = sandbox.stub(usersController, 'delete')
    sandbox.stub(Boom, 'notFound')
  })

  afterEach(() => {
    sandbox.restore()
  })

  context('#Delete', () => {
    it('should return 1 if the delete was successful with a http code of 204', (done) => {
      request = {
        params: {
          id: 1
        }
      }
      deleteStub.returns(Q.resolve(1))
      controller.handler(request, (res) => {
        return {
          code: (statusCode) => {
            expect(deleteStub).to.be.calledOnce()
            expect(res).to.be.empty()
            expect(statusCode).to.equal(204)
            return done()
          }
        }
      })
    })

    it('should return 0 if the delete request could not fine the user and should call Boom not found', (done) => {
      request = {
        params: {
          id: 1
        }
      }
      deleteStub.returns(Q.resolve(0))

      controller.handler(request, (res) => {
        expect(Boom.notFound).to.be.calledOnce()
        expect(Boom.notFound).to.be.calledWith()
        return done()
      })
    })
  })
})
