import { ApiClient } from '../ApiClient'

/**
 * Interface representing a request to call a contract function.
 */
export interface CallContractRequest {
  functionSignature: string
  params: string[]
  contractAddress: string
}

/**
 * Class for handling API calls related to smart contracts.
 */
export class ContractApi {
  private apiClient: ApiClient

  /**
   * Constructs a ContractApi instance.
   * @param apiClient - The ApiClient instance to be used for API calls.
   */
  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient
  }

  /**
   * Calls a contract function.
   * @param data - The CallContractRequest data including function signature, parameters, and contract address.
   * @returns A promise that resolves to the response from the contract call as a string.
   * @throws Will throw an error if the API call fails.
   */
  public async callContract(data: CallContractRequest): Promise<string> {
    console.log(data) // Consider removing or adjusting console logs for production use
    const res = await this.apiClient.post<string>('/contract/call', data)
    console.log(res) // Consider removing or adjusting console logs for production use
    if (res.error) {
      throw new Error(res.error.message)
    }
    return res.data as string
  }
}
