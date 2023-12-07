import { expect } from 'chai'
import { describe, it, beforeEach } from 'mocha'
import SwayeProvider from '../../src/provider'

describe('Standard Provider', async function () {
  this.timeout(50000)

  let provider: SwayeProvider
  beforeEach(() => {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
    const bearerToken = process.env.BEARER_TOKEN || 'test'
    provider = new SwayeProvider(baseUrl, bearerToken)
  })

  describe('eth_blockNumber', function () {
    it('should return the current block number', async function () {
      const blockNumber = await provider.request({
        method: 'eth_blockNumber',
        params: [],
      })
      expect(blockNumber).to.be.a('string')
    })
  })

  describe('eth_call', function () {
    it('should make a call to a contract method', async function () {
      const callData = {
        /* ... */
      } // Add the call details
      const result = await provider.request({
        method: 'eth_call',
        params: [callData, 'latest'],
      })
      expect(result).to.exist
    })
  })

  describe('eth_chainId', function () {
    it('should return the current chain ID', async function () {
      const chainId = await provider.request({
        method: 'eth_chainId',
        params: [],
      })
      expect(chainId).to.be.a('string')
    })
  })

  describe('eth_getBalance', function () {
    it('should return the balance of an account', async function () {
      const account = '0x...' // Specify the account address
      const balance = await provider.request({
        method: 'eth_getBalance',
        params: [account, 'latest'],
      })
      expect(balance).to.be.a('string')
    })
  })
  describe('eth_getBlockByHash', function () {
    it('should return block details for a given block hash', async function () {
      const blockHash = '0x...' // Specify the block hash
      const block = await provider.request({
        method: 'eth_getBlockByHash',
        params: [blockHash, false],
      })
      expect(block).to.be.an('object')
    })
  })
  describe('eth_getBlockByNumber', function () {
    it('should return block details for a given block number', async function () {
      const blockNumber = 'latest' // Or a specific block number
      const block = await provider.request({
        method: 'eth_getBlockByNumber',
        params: [blockNumber, false],
      })
      expect(block).to.be.an('object')
    })
  })
  describe('eth_getTransactionByHash', function () {
    it('should return transaction details for a given transaction hash', async function () {
      const transactionHash = '0x...' // Specify the transaction hash
      const transaction = await provider.request({
        method: 'eth_getTransactionByHash',
        params: [transactionHash],
      })
      expect(transaction).to.be.an('object')
    })
  })
  describe('eth_getTransactionReceipt', function () {
    it('should return the transaction receipt for a given transaction hash', async function () {
      const transactionHash = '0x...' // Specify the transaction hash
      const receipt = await provider.request({
        method: 'eth_getTransactionReceipt',
        params: [transactionHash],
      })
      expect(receipt).to.be.an('object')
    })
  })
  describe('eth_sendTransaction', function () {
    it('should send a transaction and return the transaction hash', async function () {
      const transaction = {
        /* ... */
      } // Transaction details
      const transactionHash = await provider.request({
        method: 'eth_sendTransaction',
        params: [transaction],
      })
      expect(transactionHash).to.be.a('string')
    })
  })
  describe('net_version', function () {
    it('should return the network version', async function () {
      const netVersion = await provider.request({
        method: 'net_version',
        params: [],
      })
      expect(netVersion).to.be.a('string')
    })
  })
})
