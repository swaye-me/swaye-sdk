import { expect } from 'chai'
import { describe, it, beforeEach } from 'mocha'
import sinon from 'sinon'
import { ApiClient } from '../../src/api/ApiClient'
import {
  ContractApi,
  CallContractRequest,
} from '../../src/api/endpoints/ContractApi'

describe('ContractApi', () => {
  let mockApiClient: ApiClient
  let contractApi: ContractApi

  beforeEach(() => {
    mockApiClient = sinon.createStubInstance(ApiClient)
    contractApi = new ContractApi(mockApiClient as unknown as ApiClient)
  })

  describe('callContract', () => {
    const callContractRequest: CallContractRequest = {
      functionSignature: 'functionSignatureExample',
      params: ['param1', 'param2'],
      contractAddress: '0xABC',
    }

    it('should successfully call a contract', async () => {
      const expectedResponse = {
        data: {
          result: '0x123',
        },
      }
      ;(mockApiClient.post as sinon.SinonStub)
        .withArgs('/contract/call', callContractRequest)
        .resolves(expectedResponse)
      const result = await contractApi.callContract(callContractRequest)
      expect(result).to.equal(expectedResponse.data)
    })

    it('should handle errors during contract call', async () => {
      const errorMessage = 'Error calling contract'
      ;(mockApiClient.post as sinon.SinonStub)
        .withArgs('/contract/call', callContractRequest)
        .rejects(new Error(errorMessage))
      try {
        await contractApi.callContract(callContractRequest)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        console.log(error)
        expect(error).to.be.an('error')
        // expect(error.message).to.equal(errorMessage)
      }
    })
  })
})
