import { ApiClient } from '../ApiClient'

/**
 * Interface representing a blockchain block.
 */
export interface Block {
  hash: string
  parentHash: string
  number: number
  transactions: any[]
  timestamp: number
  nonce: string
  difficulty: number
  gasLimit: number
  gasUsed: number
  miner: string
  extraData: string
}

/**
 * Interface for the response received when fetching a block.
 */
export interface BlockResponse {
  block?: Block
  error?: string
}

/**
 * Class handling the API calls related to blockchain blocks.
 */
export class BlockApi {
  private apiClient: ApiClient

  /**
   * Constructs the BlockApi instance.
   * @param apiClient - The ApiClient instance to be used for API calls.
   */
  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient
  }

  /**
   * Gets a block by its number.
   * @param blockNumber - The block number or hash as a number or string.
   * @returns A promise that resolves to the Block object.
   * @throws Will throw an error if the API call fails.
   */
  public async getBlock(blockNumber: number | string): Promise<Block> {
    const res = await this.apiClient.get<Block>(`/block/${blockNumber}`)
    if (res.error) {
      throw new Error(res.error.message)
    }
    return res.data as Block
  }

  /**
   * Gets the current block number.
   * @returns A promise that resolves to the current block number.
   * @throws Will throw an error if the API call fails.
   */
  public async getBlockNumber(): Promise<number | undefined> {
    const response = await this.apiClient.get<number>('/blockNumber')
    if (response.error) {
      throw new Error(response.error.message)
    }
    return response.data
  }
}
