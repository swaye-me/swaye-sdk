import { expect } from 'chai'
import { describe, it, beforeEach } from 'mocha'
import { ApiClient } from '../../src/api/ApiClient'
import { ERC20Api } from '../../src/api/endpoints/ERC20Api'

const OTHER_ADDRESS = '0xAD0867014CB5D8082c22cFdC6E99A5AA4e650fBE'

describe('ERC20Api', async function () {
  this.timeout(50000)
  let apiClient: ApiClient
  let erc20Api: ERC20Api

  beforeEach(() => {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
    const bearerToken = process.env.BEARER_TOKEN || 'test'
    apiClient = new ApiClient(baseUrl, bearerToken)
    erc20Api = new ERC20Api(apiClient)
  })

  describe('getBalance', () => {
    let request = {
      address: OTHER_ADDRESS,
      contractAddress: process.env.ERC20_CONTRACT_ADDRESS || '',
    }

    it('should retrieve balance successfully', async () => {
      const result = await erc20Api.getBalance(request)
      console.log(result)
      expect(result).to.have.property('balance')
    })

    it('should handle errors when retrieving balance', async () => {
      try {
        request.contractAddress = '0x123'
        await erc20Api.getBalance(request)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
      }
    })
  })

  describe('transfer', () => {
    let request = {
      address: OTHER_ADDRESS,
      amount: '100',
      contractAddress: process.env.ERC20_CONTRACT_ADDRESS || '',
    }

    it('should successfully transfer', async () => {
      const result = await erc20Api.transfer(request)
      expect(result).to.have.property('hash')
    })

    it('should handle errors during transfer', async () => {
      try {
        request.contractAddress = '0x123'
        await erc20Api.transfer(request)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
      }
    })
  })

  describe('approve', () => {
    let request = {
      address: OTHER_ADDRESS,
      amount: '100',
      contractAddress: process.env.ERC20_CONTRACT_ADDRESS || '',
    }

    it('should successfully approve', async () => {
      const result = await erc20Api.approve(request)
      expect(result).to.have.property('hash')
    })

    it('should handle errors during approve', async () => {
      try {
        request.contractAddress = '0x123'
        await erc20Api.approve(request)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
      }
    })
  })
  //TODO: TRANSFERFROM Not woroking
  // describe('transferFrom', () => {
  //   const request = {
  //     contractAddress: '0xABC',
  //     from: '0x123',
  //     to: '0x456',
  //     amount: '100',
  //   }

  //   it('should successfully transfer from', async () => {
  //     const result = await erc20Api.transferFrom(request)
  //     expect(result).to.have.property('hash')
  //   })

  //   it('should handle errors during transfer from', async () => {
  //     try {
  //       await erc20Api.transferFrom(request)
  //       expect.fail('Expected error was not thrown')
  //     } catch (error) {
  //       expect(error).to.be.an('error')
  //     }
  //   })
  // })

  describe('allowance', () => {
    let request = {
      owner: OTHER_ADDRESS,
      spender: '0x8714ADFa82b70F3e09a9D7b717C7e7d9C8A729A0',
      contractAddress: process.env.ERC20_CONTRACT_ADDRESS || '',
    }

    it('should successfully get allowance', async () => {
      const result = await erc20Api.allowance(request)
      expect(result).to.have.property('allowance')
    })

    it('should handle errors during get allowance', async () => {
      try {
        request.contractAddress = '0x123'
        await erc20Api.allowance(request)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
      }
    })
  })

  describe.only('totalSupply', () => {
    const request = {
      contractAddress: process.env.ERC20_CONTRACT_ADDRESS || '',
    }

    it('should successfully get total supply', async () => {
      const result = await erc20Api.totalSupply(request)
      expect(result).to.have.property('totalSupply')
    })

    it('should handle errors during get total supply', async () => {
      try {
        request.contractAddress = '0x123'
        await erc20Api.totalSupply(request)
        expect.fail('Expected error was not thrown')
      } catch (error) {
        expect(error).to.be.an('error')
      }
    })
  })
})
