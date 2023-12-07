import { ApiClient } from '../ApiClient'

/**
 * Class responsible for handling API calls related to blockchain chain data.
 */
export class ChainApi {
  private apiClient: ApiClient

  /**
   * Constructs a ChainApi instance.
   * @param apiClient - The ApiClient instance to be used for API calls.
   */
  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient
  }

  /**
   * Retrieves the chain ID.
   * @returns A promise that resolves to the chain ID as a number.
   * @throws Will throw an error if the API call fails.
   */
  public async getChainId(): Promise<number> {
    const response = await this.apiClient.get<number>('/chain/chainId')
    if (response.error) {
      throw new Error(response.error.message)
    }
    return response.data as number
  }
}
