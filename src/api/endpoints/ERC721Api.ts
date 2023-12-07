import { ApiClient } from '../ApiClient'

/**
 * Interface for ERC721 balance request.
 */
export interface ERC721BalanceRequest {
  address: string
  contractAddress: string
}

/**
 * Interface for ERC721 transfer request.
 */
export interface ERC721TransferRequest {
  from: string
  to: string
  tokenId: string
  contractAddress: string
}

/**
 * Interface for ERC721 approve request.
 */
export interface ERC721ApproveRequest {
  approvedAddress: string
  tokenId: string
  contractAddress: string
}

/**
 * Interface for checking if an address is approved for a specific ERC721 token.
 */
export interface ERC721ApprovedRequest {
  tokenId: string
  contractAddress: string
}

/**
 * Interface for setting or unsetting the approval of an operator to manage all of the caller's ERC721 tokens.
 */
export interface ERC721SetApprovalForAllRequest {
  operator: string
  approved: boolean
  contractAddress: string
}

/**
 * Interface for checking if an operator is approved to manage all of the ERC721 tokens of an owner.
 */
export interface ERC721IsApprovedForAllRequest {
  owner: string
  operator: string
  contractAddress: string
}

/**
 * Class handling the API calls related to ERC721 tokens.
 */
export class ERC721Api {
  private apiClient: ApiClient

  /**
   * Constructs an ERC721Api instance.
   * @param apiClient - The ApiClient instance for making API calls.
   */
  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient
  }

  /**
   * Gets the balance of an ERC721 token for a given address.
   * @param request - The ERC721BalanceRequest containing the address and contract address.
   * @returns A promise that resolves to the token balance as a string.
   * @throws Will throw an error if the API call fails.
   */
  public async getBalance(request: ERC721BalanceRequest): Promise<string> {
    const data = await this.apiClient.get<string>(
      '/erc721/balance/' + request.contractAddress,
      { address: request.address }
    )
    if (data.error) {
      throw new Error(data.error.message)
    }
    return data.data as string
  }

  /**
   * Initiates a transfer of ERC721 tokens.
   * @param request - The ERC721TransferRequest containing the from, to, tokenId, and contract address.
   * @returns A promise that resolves to the transaction result as a string.
   * @throws Will throw an error if the API call fails.
   */
  public async transfer(request: ERC721TransferRequest): Promise<string> {
    const data = await this.apiClient.post<string>(
      '/erc721/transferFrom',
      request
    )
    if (data.error) {
      throw new Error(data.error.message)
    }
    return data.data as string
  }

  /**
   * Approves an address to transfer the specified token.
   * @param request - The ERC721ApproveRequest containing the approved address, tokenId, and contract address.
   * @returns A promise that resolves to the approval result as a string.
   * @throws Will throw an error if the API call fails.
   */
  public async approve(request: ERC721ApproveRequest): Promise<string> {
    const data = await this.apiClient.post<string>('/erc721/approve', request)
    if (data.error) {
      throw new Error(data.error.message)
    }
    return data.data as string
  }

  /**
   * Safely transfers ERC721 tokens from one address to another.
   * @param request - The ERC721TransferRequest containing the from, to, tokenId, and contract address.
   * @returns A promise that resolves to the transaction result as a string.
   * @throws Will throw an error if the API call fails.
   */
  public async safeTransferFrom(
    request: ERC721TransferRequest
  ): Promise<string> {
    const data = await this.apiClient.post<string>(
      '/erc721/safeTransferFrom',
      request
    )
    if (data.error) {
      throw new Error(data.error.message)
    }
    return data.data as string
  }

  /**
   * Retrieves the approved address for a specific ERC721 token.
   * @param request - The ERC721ApprovedRequest containing the tokenId and contract address.
   * @returns A promise that resolves to the approved address as a string.
   * @throws Will throw an error if the API call fails.
   */
  public async approved(request: ERC721ApprovedRequest): Promise<string> {
    const data = await this.apiClient.get<string>(
      `/erc721/approved/${request.contractAddress}/${request.tokenId}`
    )
    if (data.error) {
      throw new Error(data.error.message)
    }
    return data.data as string
  }

  /**
   * Sets or unsets the approval of an operator to manage all of the caller's ERC721 tokens.
   * @param request - The ERC721SetApprovalForAllRequest containing the operator, approved flag, and contract address.
   * @returns A promise that resolves to the transaction result as a string.
   * @throws Will throw an error if the API call fails.
   */
  public async setApprovalForAll(
    request: ERC721SetApprovalForAllRequest
  ): Promise<string> {
    const data = await this.apiClient.post<string>(
      '/erc721/setApprovalForAll',
      request
    )
    if (data.error) {
      throw new Error(data.error.message)
    }
    return data.data as string
  }

  /**
   * Checks if an operator is approved to manage all of the ERC721 tokens of an owner.
   * @param request - The ERC721IsApprovedForAllRequest containing the owner, operator, and contract address.
   * @returns A promise that resolves to a boolean indicating the approval status.
   * @throws Will throw an error if the API call fails.
   */
  public async isApprovedForAll(
    request: ERC721IsApprovedForAllRequest
  ): Promise<string> {
    const data = await this.apiClient.post<string>(
      '/erc721/isApprovedForAll',
      request
    )
    if (data.error) {
      throw new Error(data.error.message)
    }
    return data.data as string
  }
}
