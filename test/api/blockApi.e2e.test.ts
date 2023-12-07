import { expect } from 'chai'
import { describe, it, beforeEach } from 'mocha'
import { ApiClient } from '../../src/api/ApiClient'
import { BlockApi } from '../../src/api/endpoints/BlockApi'

describe('BlockApi E2E', async function () {
  this.timeout(50000)
  let apiClient: ApiClient
  let blockApi: BlockApi

  beforeEach(() => {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
    const bearerToken = process.env.BEARER_TOKEN || 'test'
    apiClient = new ApiClient(baseUrl, bearerToken)
    blockApi = new BlockApi(apiClient)
  })

  describe('getBlock', () => {
    it('should retrieve block data successfully', async () => {
      const blockNumber = 12345

      const result = await blockApi.getBlock(blockNumber)
      console.log(result)
      // expect(result).to.have.property('block')
      expect(result).to.have.property('number', blockNumber)
      // Add more assertions based on the expected structure of 'block'
    })

    it('should handle API errors', async () => {
      const blockNumber = ''

      try {
        await blockApi.getBlock(blockNumber)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
        // Additional assertions about the error can be added here
      }
    })

    // Additional tests for other scenarios like network issues, invalid block numbers, etc.
  })

  // Add tests for any additional methods if needed
})
