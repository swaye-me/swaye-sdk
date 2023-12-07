import { expect } from 'chai'
import { describe, it, beforeEach } from 'mocha'
import { ApiClient } from '../../src/api/ApiClient'
import { UserApi } from '../../src/api/endpoints/UserApi'

describe('UserApi E2E', () => {
  let apiClient: ApiClient
  let userApi: UserApi

  beforeEach(() => {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
    const bearerToken = process.env.BEARER_TOKEN || 'test'

    apiClient = new ApiClient(baseUrl, bearerToken)
    userApi = new UserApi(apiClient)
  })

  describe('getUser', () => {
    it('should retrieve user data successfully', async () => {
      const result = await userApi.getUser()
      expect(result).to.have.property('handle')
      expect(result).to.have.nested.property('wallet.address')
    })

    it('should handle errors when retrieving user data', async () => {
      try {
        apiClient.setBearerToken('invalid')
        await userApi.getUser()
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
      }
    })
  })
})
