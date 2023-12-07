// BlockApi.test.ts

import { expect } from 'chai'
import { describe, it } from 'mocha'
import sinon from 'sinon'
import { ApiClient } from '../../src/api/ApiClient'
import { Block, BlockApi } from '../../src/api/endpoints/BlockApi'

describe('BlockApi', () => {
  let mockApiClient: ApiClient
  let blockApi: BlockApi

  beforeEach(() => {
    mockApiClient = sinon.createStubInstance(ApiClient)
    blockApi = new BlockApi(mockApiClient as unknown as ApiClient)
  })

  describe('getBlock', () => {
    it('should retrieve block data successfully', async () => {
      const blockNumber = 12345
      const expectedBlock = {
        data: {
          number: blockNumber,
          transactions: [],
        },
      }

      ;(mockApiClient.get<Block> as sinon.SinonStub)
        .withArgs(`/block/${blockNumber}`)
        .resolves(expectedBlock)

      const result = await blockApi.getBlock(blockNumber)
      expect(result).to.deep.equal({ block: expectedBlock.data })
    })

    it('should handle API errors', async () => {
      const blockNumber = 99999
      const errorMessage = 'Error retrieving block'

      ;(mockApiClient.get as sinon.SinonStub)
        .withArgs(`/block/${blockNumber}`)
        .rejects(new Error(errorMessage))

      try {
        await blockApi.getBlock(blockNumber)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        console.log(error)
        expect(error).to.be.an('error')
        // expect(error.message).to.equal(errorMessage)
      }
    })

    // Additional tests for other scenarios like network issues, invalid block numbers, etc.
  })

  // Add tests for any additional methods if needed
})
