'use strict'
const usersController = require('../../../controllers/usersController')
const controller = require('../../../routes/users/post')
const Q = require('q')
let postStub
let request = {}

describe('Routes::Users::Post', () => {
  beforeEach(() => {
    postStub = sandbox.stub(usersController, 'create')
  })
  afterEach(() => {
    sandbox.restore()
  })

  context('#Create', () => {
    it('should call the create controller', () => {
      request = {
        payload: {
          forename: 'test',
          surname: 'test',
          email: 'test@test.com'
        }
      }

      const expectedData = {
        forename: 'test',
        surname: 'test',
        email: 'test@test.com',
        date: new Date()
      }
      postStub.returns(Q.resolve(expectedData))
      controller.handler(request, (result) => {
        return {
          code: (statusCode) => {
            expect(postStub).to.be.calledOnce()
            expect(statusCode).to.equal(201)
            expect(result).to.deep.equal(expectedData)
          }
        }
      })
    })
  })
})
