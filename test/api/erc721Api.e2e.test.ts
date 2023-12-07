import { expect } from 'chai'
import { describe, it, beforeEach } from 'mocha'
import { ApiClient } from '../../src/api/ApiClient'
import { ERC721Api } from '../../src/api/endpoints/ERC721Api'

const OTHER_ADDRESS = '0xAD0867014CB5D8082c22cFdC6E99A5AA4e650fBE'

describe('ERC721Api E2E', async function () {
  this.timeout(50000)
  let apiClient: ApiClient
  let erc721Api: ERC721Api

  beforeEach(() => {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
    const bearerToken = process.env.BEARER_TOKEN || 'test'
    apiClient = new ApiClient(baseUrl, bearerToken)
    erc721Api = new ERC721Api(apiClient)
  })

  describe('getBalance', () => {
    let request = {
      address: '0x3ec876C3BBDC58a583E60c938AAc9f284de6CA33',
      contractAddress: process.env.ERC721_CONTRACT_ADDRESS || '',
    }

    it('should retrieve balance successfully', async () => {
      const result = await erc721Api.getBalance(request)
      expect(result).to.have.property('balance')
    })

    it('should handle errors when retrieving balance', async () => {
      try {
        request.contractAddress = '0x123'
        await erc721Api.getBalance(request)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
      }
    })
  })

  describe('transfer', () => {
    let request = {
      from: '0x3ec876C3BBDC58a583E60c938AAc9f284de6CA33',
      to: OTHER_ADDRESS,
      tokenId: '2',
      contractAddress: process.env.ERC721_CONTRACT_ADDRESS || '',
    }

    it('should successfully transfer', async () => {
      const result = await erc721Api.transfer(request)
      expect(result).to.have.property('hash')
    })

    it('should handle errors during transfer', async () => {
      try {
        request.contractAddress = '0x123'
        await erc721Api.transfer(request)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
      }
    })
  })

  describe('approve', () => {
    let request = {
      approvedAddress: OTHER_ADDRESS,
      tokenId: '2',
      contractAddress: process.env.ERC721_CONTRACT_ADDRESS || '',
    }

    it('should successfully approve', async () => {
      const result = await erc721Api.approve(request)
      expect(result).to.have.property('hash')
    })

    it('should handle errors during approve', async () => {
      try {
        request.contractAddress = '0x123'
        await erc721Api.approve(request)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
      }
    })
  })

  describe('safeTransferFrom', () => {
    let request = {
      from: '0x3ec876C3BBDC58a583E60c938AAc9f284de6CA33',
      to: OTHER_ADDRESS,
      tokenId: '2',
      contractAddress: process.env.ERC721_CONTRACT_ADDRESS || '',
    }

    it('should successfully perform safeTransferFrom', async () => {
      const result = await erc721Api.safeTransferFrom(request)
      expect(result).to.have.property('hash')
    })

    it('should handle errors during safeTransferFrom', async () => {
      try {
        request.contractAddress = '0x123'
        await erc721Api.safeTransferFrom(request)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
      }
    })
  })

  describe('approved', () => {
    let request = {
      tokenId: '2',
      contractAddress: process.env.ERC721_CONTRACT_ADDRESS || '',
    }

    it('should successfully get approved address', async () => {
      const result = await erc721Api.approved(request)
      expect(result).to.have.property('approvedAddress')
    })

    it('should handle errors during getting approved address', async () => {
      try {
        request.contractAddress = '0x123'
        await erc721Api.approved(request)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
      }
    })
  })

  describe('setApprovalForAll', () => {
    let request = {
      operator: OTHER_ADDRESS,
      approved: true,
      contractAddress: process.env.ERC721_CONTRACT_ADDRESS || '',
    }

    it('should successfully set approval for all', async () => {
      const result = await erc721Api.setApprovalForAll(request)
      expect(result).to.have.property('hash')
    })

    it('should handle errors during setting approval for all', async () => {
      try {
        request.contractAddress = '0x123'
        await erc721Api.setApprovalForAll(request)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
      }
    })
  })

  describe('isApprovedForAll', () => {
    let request = {
      owner: '0x3ec876C3BBDC58a583E60c938AAc9f284de6CA33',
      operator: OTHER_ADDRESS,
      contractAddress: process.env.ERC721_CONTRACT_ADDRESS || '',
    }

    it('should successfully check if approved for all', async () => {
      const result = await erc721Api.isApprovedForAll(request)
      expect(result).to.have.property('isApproved')
    })

    it('should handle errors during checking if approved for all', async () => {
      try {
        request.contractAddress = '0x123'
        await erc721Api.isApprovedForAll(request)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
      }
    })
  })
})
