import { expect } from 'chai'
import { describe, it, beforeEach } from 'mocha'
import { ApiClient } from '../../src/api/ApiClient'
import {
  TransactionApi,
  TransactionRequest,
} from '../../src/api/endpoints/TransactionApi'

describe('TransactionApi', async function () {
  this.timeout(50000)
  let apiClient: ApiClient
  let transactionApi: TransactionApi

  beforeEach(() => {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
    const bearerToken = process.env.BEARER_TOKEN || 'test'
    apiClient = new ApiClient(baseUrl, bearerToken)
    transactionApi = new TransactionApi(apiClient)
  })

  describe('submitTransactionRequest', () => {
    let transactionRequest: TransactionRequest = {
      functionSignature: 'function transfer(address,uint256)',
      params: ['0xAD0867014CB5D8082c22cFdC6E99A5AA4e650fBE', '100'],
      contractAddress: process.env.ERC20_CONTRACT_ADDRESS || '',
    }

    it('should successfully submit a transaction request', async () => {
      const result = await transactionApi.submitTransactionRequest(
        transactionRequest
      )
      console.log(result)
      expect(result).to.have.property('hash')
    })

    it('should handle errors during transaction submission', async () => {
      try {
        transactionRequest.functionSignature = 'invalid function signature'
        await transactionApi.submitTransactionRequest(transactionRequest)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
      }
    })
  })

  describe('getTransaction', () => {
    let transactionHash =
      '0xeacacf4282564b903974e1f254e2d009ff92d5df4cfc3c1d8afef4c71204fb7a'

    it('should successfully retrieve a transaction', async () => {
      const result = await transactionApi.getTransaction(transactionHash)
      console.log(result)
      expect(result).to.have.property('transaction')
    })

    it('should handle errors during transaction retrieval', async () => {
      try {
        transactionHash = '0x123'
        await transactionApi.getTransaction(transactionHash)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
      }
    })
  })

  describe('getTransaction receipt', () => {
    let transactionHash =
      '0xeacacf4282564b903974e1f254e2d009ff92d5df4cfc3c1d8afef4c71204fb7a'

    it('should successfully retrieve a transaction', async () => {
      const result = await transactionApi.getTransactionReceipt(transactionHash)
      console.log(result)
      expect(result).to.have.property('transactionHash')
    })

    it('should handle errors during transaction retrieval', async () => {
      try {
        transactionHash = '0x123'
        await transactionApi.getTransaction(transactionHash)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
      }
    })
  })

  // Add tests for any additional transaction-related methods if needed
})
