// TransactionApi.test.ts

import { expect } from 'chai'
import { describe, it, beforeEach } from 'mocha'
import sinon from 'sinon'
import { ApiClient } from '../../src/api/ApiClient'
import {
  TransactionApi,
  TransactionRequest,
} from '../../src/api/endpoints/TransactionApi'

describe('TransactionApi', () => {
  let mockApiClient: ApiClient
  let transactionApi: TransactionApi

  beforeEach(() => {
    mockApiClient = sinon.createStubInstance(ApiClient)
    transactionApi = new TransactionApi(mockApiClient as unknown as ApiClient)
  })

  describe('submitTransactionRequest', () => {
    const transactionRequest: TransactionRequest = {
      // Add appropriate fields for the transaction request
      functionSignature: 'functionSignatureExample',
      params: ['param1', 'param2'],
      contractAddress: '0xABC',
    }

    it('should successfully submit a transaction request', async () => {
      const expectedResponse = {
        // Add expected fields of the response
        data: {
          hash: '0x123',
        },
      }
      ;(mockApiClient.post as sinon.SinonStub)
        .withArgs('/transaction', transactionRequest)
        .resolves(expectedResponse)
      const result = await transactionApi.submitTransactionRequest(
        transactionRequest
      )
      expect(result).to.deep.equal(expectedResponse.data)
    })

    it('should handle errors during transaction submission', async () => {
      const errorMessage = 'Error submitting transaction'
      ;(mockApiClient.post as sinon.SinonStub)
        .withArgs('/transaction', transactionRequest)
        .rejects(new Error(errorMessage))
      try {
        await transactionApi.submitTransactionRequest(transactionRequest)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
        // expect(error.message).to.equal(errorMessage)
      }
    })
  })

  describe('getTransaction', () => {
    const transactionHash = '0x123'

    it('should successfully retrieve a transaction', async () => {
      const expectedTransaction = {
        // Add expected fields of the transaction
        data: {
          hash: '0x123',
        },
      }
      ;(mockApiClient.get as sinon.SinonStub)
        .withArgs(`/transaction/${transactionHash}`)
        .resolves(expectedTransaction)
      const result = await transactionApi.getTransaction(transactionHash)
      expect(result).to.deep.equal(expectedTransaction.data)
    })

    it('should handle errors during transaction retrieval', async () => {
      const errorMessage = 'Error retrieving transaction'
      ;(mockApiClient.get as sinon.SinonStub)
        .withArgs(`/transaction/${transactionHash}`)
        .rejects(new Error(errorMessage))
      try {
        await transactionApi.getTransaction(transactionHash)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
        // expect(error.message).to.equal(errorMessage)
      }
    })
  })

  // Add tests for any additional transaction-related methods if needed
})
