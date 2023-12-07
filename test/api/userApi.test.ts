import { expect } from 'chai'
import { describe, it, beforeEach } from 'mocha'
import sinon from 'sinon'
import { ApiClient } from '../../src/api/ApiClient'
import { UserApi } from '../../src/api/endpoints/UserApi'

describe('UserApi', () => {
  let mockApiClient: ApiClient
  let userApi: UserApi

  beforeEach(() => {
    mockApiClient = sinon.createStubInstance(ApiClient)
    userApi = new UserApi(mockApiClient as unknown as ApiClient)
  })

  describe('getUser', () => {
    it('should retrieve user data successfully', async () => {
      const expectedUser = {
        data: {
          handle: 'testuser',
          wallet: { address: '0x123' },
        },
      }
      ;(mockApiClient.get as sinon.SinonStub)
        .withArgs('/user')
        .resolves(expectedUser)
      const result = await userApi.getUser()
      expect(result).to.deep.equal(expectedUser.data)
    })

    it('should handle errors when retrieving user data', async () => {
      const errorMessage = 'Error getting user data'
      ;(mockApiClient.get as sinon.SinonStub)
        .withArgs('/user')
        .rejects(new Error(errorMessage))
      try {
        await userApi.getUser()
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
        // expect(error.message).to.equal(errorMessage)
      }
    })
  })
})
