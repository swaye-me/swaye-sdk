import { ApiClient } from '../ApiClient'

/**
 * Interface representing a transaction request.
 */
export interface TransactionRequest {
  functionSignature: string
  params: any[]
  contractAddress: string
  value?: string
}

/**
 * Interface representing a transaction response.
 */

export interface TransactionResponse {
  hash?: string
  error?: string
}

/**
 * Interface representing a transaction.
 */

export interface Transaction {
  hash: string
  type: number
  accessList: any[]
  blockHash: string
  blockNumber: number
  transactionIndex: number
  confirmations: number
  from: string
  gasPrice: string
  maxPriorityFeePerGas: string
  maxFeePerGas: string
  gasLimit: number
  to: string
  value: string
  nonce: number
  data: string
  r: string
  s: string
  v: number
  creates: string
  chainId: number
}

/**
 * Interface representing a transaction receipt.
 */

export interface TransactionReceipt {
  to: string
  from: string
  contractAddress: string
  transactionIndex: number
  gasUsed: number
  logsBloom: string
  blockHash: string
  transactionHash: string
  logs: any[] //TODO: define log type
  blockNumber: number
  confirmations: number
  cumulativeGasUsed: number
  effectiveGasPrice: string
  status: number
  type: number
  byzantium: boolean
}

/**
 * Class handling API calls related to blockchain transactions.
 */
export class TransactionApi {
  private apiClient: ApiClient

  /**
   * Constructs a TransactionApi instance.
   * @param apiClient - The ApiClient instance for making API calls.
   */
  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient
  }

  /**
   * Submits a transaction request.
   * @param transactionRequest - The TransactionRequest object containing details of the transaction.
   * @returns A promise that resolves to a TransactionResponse object.
   * @throws Will throw an error if the API call fails.
   */
  public async submitTransactionRequest(
    transactionRequest: TransactionRequest
  ): Promise<TransactionResponse> {
    const data = await this.apiClient.post<TransactionResponse>(
      '/transaction/submit',
      transactionRequest
    )
    if (data.error) {
      throw new Error(data.error.message)
    }
    return { hash: data.data?.hash }
  }

  /**
   * Retrieves a transaction by its hash.
   * @param hash - The hash of the transaction to be retrieved.
   * @returns A promise that resolves to a Transaction object.
   * @throws Will throw an error if the API call fails.
   */
  public async getTransaction(hash: string): Promise<Transaction> {
    const data = await this.apiClient.get<Transaction>(`/transaction/${hash}`)
    if (data.error) {
      throw new Error(data.error.message)
    }
    return data.data as Transaction
  }

  /**
   * Retrieves the receipt of a transaction by its hash.
   * @param hash - The hash of the transaction for which the receipt is to be retrieved.
   * @returns A promise that resolves to a TransactionReceipt object.
   * @throws Will throw an error if the API call fails.
   */
  public async getTransactionReceipt(
    hash: string
  ): Promise<TransactionReceipt> {
    const data = await this.apiClient.get<TransactionReceipt>(
      `/transaction/${hash}/receipt`
    )
    if (data.error) {
      throw new Error(data.error.message)
    }
    return data.data as TransactionReceipt
  }
}
