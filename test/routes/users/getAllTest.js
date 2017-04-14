'use strict'
const Q = require('q')
const usersController = require('../../../controllers/usersController')
const controller = require('../../../routes/users/getAll')
let getAllStub
let request = {}
describe('Routes::Users::Get', () => {
  beforeEach(() => {
    getAllStub = sandbox.stub(usersController, 'getAll')
  })
  afterEach(() => {
    sandbox.restore()
  })

  context('#Get', () => {
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
  })
})
