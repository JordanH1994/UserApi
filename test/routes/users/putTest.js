'use strict'
const usersController = require('../../../controllers/usersController')
const controller = require('../../../routes/users/put')
const Q = require('q')
const Boom = require('boom')
let putStub
let request = {}
describe('Routes::Users::Put', () => {
  beforeEach(() => {
    putStub = sandbox.stub(usersController, 'update')
    sandbox.stub(Boom, 'notFound')
  })
  afterEach(() => {
    sandbox.restore()
  })

  context('#Update', () => {
    it('should return a http code if the update was successful', () => {
      request = {
        params: {
          id: 1
        },
        payload: {
          forename: 'test',
          surname: 'test',
          email: 'test@test.com'
        }
      }

      putStub.returns(Q.resolve([1, [ ]]))
      controller.handler(request, (result) => {
        return {
          code: (statusCode) => {
            expect(putStub).to.be.calledOnce()
            expect(putStub).to.be.calledWith(1, {
              forename: 'test',
              surname: 'test',
              email: 'test@test.com'
            })
            expect(statusCode).to.equal(204)
          }
        }
      })
    })

    it('should call Boom not found if the id passed in was not found', () => {
      request = {
        params: {
          id: 1
        },
        payload: {
          forename: 'test',
          surname: 'test',
          email: 'test@test.com'
        }
      }
      putStub.returns(Q.resolve([0, [ ]]))
      controller.handler(request, (result) => {
        expect(putStub).to.be.calledOnce()
        expect(putStub).to.be.calledWith(1, {
          forename: 'test',
          surname: 'test',
          email: 'test@test.com'
        })
        expect(Boom.notFound).to.be.calledWith('Cant not update user with Id: 1, user does not exist')
      })
    })
  })
})
