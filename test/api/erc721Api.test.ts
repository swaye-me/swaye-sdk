import { expect } from 'chai'
import { describe, it, beforeEach } from 'mocha'
import sinon from 'sinon'
import { ApiClient } from '../../src/api/ApiClient'
import { ERC721Api } from '../../src/api/endpoints/ERC721Api'

describe('ERC721Api', () => {
  let mockApiClient: ApiClient
  let erc721Api: ERC721Api

  beforeEach(() => {
    mockApiClient = sinon.createStubInstance(ApiClient)
    erc721Api = new ERC721Api(mockApiClient as unknown as ApiClient)
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
        .withArgs('/erc721/getBalance', request)
        .resolves(expectedBalance)
      const result = await erc721Api.getBalance(request)
      expect(result).to.equal(expectedBalance.data)
    })

    it('should handle errors when retrieving balance', async () => {
      const errorMessage = 'Error getting balance'
      ;(mockApiClient.post as sinon.SinonStub)
        .withArgs('/erc721/getBalance', request)
        .rejects(new Error(errorMessage))
      try {
        await erc721Api.getBalance(request)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
        // expect(error.message).to.equal(errorMessage)
      }
    })
  })

  describe('transfer', () => {
    const request = {
      from: '0x123',
      to: '0x456',
      tokenId: '1',
      contractAddress: '0xABC',
    }

    it('should successfully transfer', async () => {
      const expectedResponse = {
        data: {
          hash: 'Transaction hash',
        },
      }
      ;(mockApiClient.post as sinon.SinonStub)
        .withArgs('/erc721/transfer', request)
        .resolves(expectedResponse)
      const result = await erc721Api.transfer(request)
      expect(result).to.equal(expectedResponse.data)
    })

    it('should handle errors during transfer', async () => {
      const errorMessage = 'Error during transfer'
      ;(mockApiClient.post as sinon.SinonStub)
        .withArgs('/erc721/transfer', request)
        .rejects(new Error(errorMessage))
      try {
        await erc721Api.transfer(request)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
        // expect(error.message).to.equal(errorMessage)
      }
    })
  })

  describe('approve', () => {
    const request = {
      approvedAddress: '0x456',
      tokenId: '1',
      contractAddress: '0xABC',
    }

    it('should successfully approve', async () => {
      const expectedResponse = {
        data: {
          hash: 'Approval hash',
        },
      }
      ;(mockApiClient.post as sinon.SinonStub)
        .withArgs('/erc721/approve', request)
        .resolves(expectedResponse)
      const result = await erc721Api.approve(request)
      expect(result).to.equal(expectedResponse.data)
    })

    it('should handle errors during approve', async () => {
      const errorMessage = 'Error during approve'
      ;(mockApiClient.post as sinon.SinonStub)
        .withArgs('/erc721/approve', request)
        .rejects(new Error(errorMessage))
      try {
        await erc721Api.approve(request)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
        // expect(error.message).to.equal(errorMessage)
      }
    })
  })

  describe('safeTransferFrom', () => {
    const request = {
      from: '0x123',
      to: '0x456',
      tokenId: '1',
      contractAddress: '0xABC',
    }

    it('should successfully perform safeTransferFrom', async () => {
      const expectedResponse = {
        data: {
          hash: 'SafeTransferFrom hash',
        },
      }
      ;(mockApiClient.post as sinon.SinonStub)
        .withArgs('/erc721/safeTransferFrom', request)
        .resolves(expectedResponse)
      const result = await erc721Api.safeTransferFrom(request)
      expect(result).to.equal(expectedResponse.data)
    })

    it('should handle errors during safeTransferFrom', async () => {
      const errorMessage = 'Error during safeTransferFrom'
      ;(mockApiClient.post as sinon.SinonStub)
        .withArgs('/erc721/safeTransferFrom', request)
        .rejects(new Error(errorMessage))
      try {
        await erc721Api.safeTransferFrom(request)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
        // expect(error.message).to.equal(errorMessage)
      }
    })
  })

  describe('approved', () => {
    const request = { tokenId: '1', contractAddress: '0xABC' }

    it('should successfully get approved address', async () => {
      const expectedResponse = {
        data: {
          approvedAddress: '0x456',
        },
      }
      ;(mockApiClient.post as sinon.SinonStub)
        .withArgs('/erc721/approved', request)
        .resolves(expectedResponse)
      const result = await erc721Api.approved(request)
      expect(result).to.equal(expectedResponse.data)
    })

    it('should handle errors during getting approved address', async () => {
      const errorMessage = 'Error getting approved address'
      ;(mockApiClient.post as sinon.SinonStub)
        .withArgs('/erc721/approved', request)
        .rejects(new Error(errorMessage))
      try {
        await erc721Api.approved(request)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
        // expect(error.message).to.equal(errorMessage)
      }
    })
  })

  describe('setApprovalForAll', () => {
    const request = {
      operator: '0x456',
      approved: true,
      contractAddress: '0xABC',
    }

    it('should successfully set approval for all', async () => {
      const expectedResponse = {
        data: {
          hash: 'SetApprovalForAll hash',
        },
      }
      ;(mockApiClient.post as sinon.SinonStub)
        .withArgs('/erc721/setApprovalForAll', request)
        .resolves(expectedResponse)
      const result = await erc721Api.setApprovalForAll(request)
      expect(result).to.equal(expectedResponse.data)
    })

    it('should handle errors during setting approval for all', async () => {
      const errorMessage = 'Error setting approval for all'
      ;(mockApiClient.post as sinon.SinonStub)
        .withArgs('/erc721/setApprovalForAll', request)
        .rejects(new Error(errorMessage))
      try {
        await erc721Api.setApprovalForAll(request)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
        // expect(error.message).to.equal(errorMessage)
      }
    })
  })

  describe('isApprovedForAll', () => {
    const request = {
      owner: '0x123',
      operator: '0x456',
      contractAddress: '0xABC',
    }

    it('should successfully check if approved for all', async () => {
      const expectedResponse = {
        data: {
          isApproved: true,
        },
      }
      ;(mockApiClient.post as sinon.SinonStub)
        .withArgs('/erc721/isApprovedForAll', request)
        .resolves(expectedResponse)
      const result = await erc721Api.isApprovedForAll(request)
      expect(result).to.equal(expectedResponse.data)
    })

    it('should handle errors during checking if approved for all', async () => {
      const errorMessage = 'Error checking if approved for all'
      ;(mockApiClient.post as sinon.SinonStub)
        .withArgs('/erc721/isApprovedForAll', request)
        .rejects(new Error(errorMessage))
      try {
        await erc721Api.isApprovedForAll(request)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
        // expect(error.message).to.equal(errorMessage)
      }
    })
  })
})
