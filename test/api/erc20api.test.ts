import { expect } from 'chai'
import { describe, it, beforeEach } from 'mocha'
import sinon from 'sinon'
import { ApiClient } from '../../src/api/ApiClient'
import { ERC20Api } from '../../src/api/endpoints/ERC20Api'

describe('ERC20Api', () => {
  let mockApiClient: ApiClient
  let erc20Api: ERC20Api

  beforeEach(() => {
    mockApiClient = sinon.createStubInstance(ApiClient)
    erc20Api = new ERC20Api(mockApiClient as unknown as ApiClient)
  })

  describe('getBalance', () => {
    const request = { address: '0x123', contractAddress: '0xABC' }

    it('should retrieve balance successfully', async () => {
      const expectedBalance = {
        data: {
          balance: '1000',
        },
      }
      ;(mockApiClient.post as sinon.SinonStub)
        .withArgs('/erc20/getBalance', request)
        .resolves(expectedBalance)
      const result = await erc20Api.getBalance(request)
      expect(result).to.equal(expectedBalance.data)
    })

    it('should handle errors when retrieving balance', async () => {
      const errorMessage = 'Error getting balance'
      ;(mockApiClient.post as sinon.SinonStub)
        .withArgs('/erc20/getBalance', request)
        .rejects(new Error(errorMessage))
      try {
        await erc20Api.getBalance(request)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
        // expect(error.message).to.equal(errorMessage)
      }
    })
  })

  describe('transfer', () => {
    const request = {
      address: '0x123',
      amount: '100',
      contractAddress: '0xABC',
    }

    it('should successfully transfer', async () => {
      const expectedResponse = {
        data: {
          hash: 'Transfer hash',
        },
      }
      ;(mockApiClient.post as sinon.SinonStub)
        .withArgs('/erc20/transfer', request)
        .resolves(expectedResponse)
      const result = await erc20Api.transfer(request)
      expect(result).to.equal(expectedResponse.data)
    })

    it('should handle errors during transfer', async () => {
      const errorMessage = 'Error during transfer'
      ;(mockApiClient.post as sinon.SinonStub)
        .withArgs('/erc20/transfer', request)
        .rejects(new Error(errorMessage))
      try {
        await erc20Api.transfer(request)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
        // expect(error.message).to.equal(errorMessage)
      }
    })
  })

  describe('approve', () => {
    const request = {
      address: '0x123',
      amount: '100',
      contractAddress: '0xABC',
    }

    it('should successfully approve', async () => {
      const expectedResponse = {
        data: {
          hash: 'Approve hash',
        },
      }
      ;(mockApiClient.post as sinon.SinonStub)
        .withArgs('/erc20/approve', request)
        .resolves(expectedResponse)
      const result = await erc20Api.approve(request)
      expect(result).to.equal(expectedResponse.data)
    })

    it('should handle errors during approve', async () => {
      const errorMessage = 'Error during approve'
      ;(mockApiClient.post as sinon.SinonStub)
        .withArgs('/erc20/approve', request)
        .rejects(new Error(errorMessage))
      try {
        await erc20Api.approve(request)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
        // expect(error.message).to.equal(errorMessage)
      }
    })
  })

  describe('transferFrom', () => {
    const request = {
      contractAddress: '0xABC',
      from: '0x123',
      to: '0x456',
      amount: '100',
    }

    it('should successfully transfer from', async () => {
      const expectedResponse = {
        data: {
          hash: 'TransferFrom hash',
        },
      }
      ;(mockApiClient.post as sinon.SinonStub)
        .withArgs('/erc20/transferFrom', request)
        .resolves(expectedResponse)
      const result = await erc20Api.transferFrom(request)
      expect(result).to.equal(expectedResponse.data)
    })

    it('should handle errors during transfer from', async () => {
      const errorMessage = 'Error during transfer from'
      ;(mockApiClient.post as sinon.SinonStub)
        .withArgs('/erc20/transferFrom', request)
        .rejects(new Error(errorMessage))
      try {
        await erc20Api.transferFrom(request)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
        // expect(error.message).to.equal(errorMessage)
      }
    })
  })

  describe('allowance', () => {
    const request = {
      owner: '0x123',
      spender: '0x456',
      contractAddress: '0xABC',
    }

    it('should successfully get allowance', async () => {
      const expectedResponse = {
        data: {
          allowance: '1000',
        },
      }
      ;(mockApiClient.post as sinon.SinonStub)
        .withArgs('/erc20/allowance', request)
        .resolves(expectedResponse)
      const result = await erc20Api.allowance(request)
      expect(result).to.equal(expectedResponse.data)
    })

    it('should handle errors during get allowance', async () => {
      const errorMessage = 'Error getting allowance'
      ;(mockApiClient.post as sinon.SinonStub)
        .withArgs('/erc20/allowance', request)
        .rejects(new Error(errorMessage))
      try {
        await erc20Api.allowance(request)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
        // expect(error.message).to.equal(errorMessage)
      }
    })
  })

  describe('totalSupply', () => {
    const request = { contractAddress: '0xABC' }

    it('should successfully get total supply', async () => {
      const expectedResponse = {
        data: {
          totalSupply: '1000',
        },
      }
      ;(mockApiClient.post as sinon.SinonStub)
        .withArgs('/erc20/totalSupply', request)
        .resolves(expectedResponse)
      const result = await erc20Api.totalSupply(request)
      expect(result).to.equal(expectedResponse.data)
    })

    it('should handle errors during get total supply', async () => {
      const errorMessage = 'Error getting total supply'
      ;(mockApiClient.post as sinon.SinonStub)
        .withArgs('/erc20/totalSupply', request)
        .rejects(new Error(errorMessage))
      try {
        await erc20Api.totalSupply(request)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
        // expect(error.message).to.equal(errorMessage)
      }
    })
  })
})
