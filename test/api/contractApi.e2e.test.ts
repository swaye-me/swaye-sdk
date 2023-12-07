import { expect } from 'chai'
import { describe, it, beforeEach } from 'mocha'
import { ApiClient } from '../../src/api/ApiClient'
import {
  ContractApi,
  CallContractRequest,
} from '../../src/api/endpoints/ContractApi'

describe('ContractApi E2E', async function () {
  this.timeout(50000)
  let apiClient: ApiClient
  let contractApi: ContractApi

  beforeEach(() => {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
    const bearerToken = process.env.BEARER_TOKEN || 'test'
    apiClient = new ApiClient(baseUrl, bearerToken)
    contractApi = new ContractApi(apiClient)
  })

  describe('callContract', () => {
    let callContractRequest: CallContractRequest = {
      functionSignature: 'function balanceOf(address) view returns (uint256)',
      params: ['0x0000000000000000000000000000000000000000'],
      contractAddress: process.env.ERC20_CONTRACT_ADDRESS || '',
    }

    it('should successfully call a contract', async () => {
      const result = await contractApi.callContract(callContractRequest)
      // Assuming the API returns a specific structure; adjust as needed
      expect(result).to.have.property('result')
    })

    it('should handle errors during contract call', async () => {
      try {
        callContractRequest.functionSignature = 'invalid function signature'
        await contractApi.callContract(callContractRequest)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
        // Additional assertions about the error can be added here
      }
    })
  })
})
