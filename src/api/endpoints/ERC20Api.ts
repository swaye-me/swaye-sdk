import { ApiClient } from '../ApiClient'

/**
 * Interface for ERC20 balance request.
 */
export interface ERC20BalanceRequest {
  address: string
  contractAddress: string
}

/**
 * Interface for ERC20 transfer request.
 */
export interface ERC20TransferRequest {
  address: string
  amount: string
  contractAddress: string
}

/**
 * Interface for ERC20 approve request.
 */
export interface ERC20ApproveRequest {
  address: string
  amount: string
  contractAddress: string
}

/**
 * Interface for ERC20 transferFrom request.
 */
export interface ERC20TransferFromRequest {
  contractAddress: string
  from: string
  to: string
  amount: string
}

/**
 * Interface for ERC20 allowance request.
 */
export interface ERC20AllowanceRequest {
  owner: string
  spender: string
  contractAddress: string
}

/**
 * Interface for ERC20 total supply request.
 */
export interface ERC20TotalSupplyRequest {
  contractAddress: string
}
/**
 * Class handling the API calls related to ERC20 tokens.
 */
export class ERC20Api {
  private apiClient: ApiClient

  /**
   * Constructs an ERC20Api instance.
   * @param apiClient - The ApiClient instance for making API calls.
   */
  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient
  }

  /**
   * Gets the balance of an ERC20 token for a given address.
   * @param request - The ERC20BalanceRequest containing the address and contract address.
   * @returns A promise that resolves to the token balance as a string.
   * @throws Will throw an error if the API call fails.
   */
  public async getBalance(request: ERC20BalanceRequest): Promise<string> {
    const data = await this.apiClient.get<string>(
      '/erc20/balance/' + request.contractAddress,
      { address: request.address }
    )
    if (data.error) {
      throw new Error(data.error.message)
    }
    return data.data as string
  }

  /**
   * Initiates a transfer of ERC20 tokens.
   * @param request - The ERC20TransferRequest containing the address, amount, and contract address.
   * @returns A promise that resolves to the transaction result as a string.
   * @throws Will throw an error if the API call fails.
   */
  public async transfer(request: ERC20TransferRequest): Promise<string> {
    const data = await this.apiClient.post<string>('/erc20/transfer', request)
    if (data.error) {
      throw new Error(data.error.message)
    }
    return data.data as string
  }

  /**
   * Approves a spender to withdraw from your account, multiple times, up to the specified amount.
   * @param request - The ERC20ApproveRequest containing the address, amount, and contract address.
   * @returns A promise that resolves to the approval result as a string.
   * @throws Will throw an error if the API call fails.
   */
  public async approve(request: ERC20ApproveRequest): Promise<string> {
    const data = await this.apiClient.post<string>('/erc20/approve', request)
    if (data.error) {
      throw new Error(data.error.message)
    }
    return data.data as string
  }

  /**
   * Transfers tokens from one address to another.
   * @param request - The ERC20TransferFromRequest containing the contract, from, to addresses, and amount.
   * @returns A promise that resolves to the transaction result as a string.
   * @throws Will throw an error if the API call fails.
   */
  public async transferFrom(
    request: ERC20TransferFromRequest
  ): Promise<string> {
    const data = await this.apiClient.post<string>(
      '/erc20/transferFrom',
      request
    )
    if (data.error) {
      throw new Error(data.error.message)
    }
    return data.data as string
  }

  /**
   * Retrieves the amount which a spender is still allowed to withdraw from an owner.
   * @param request - The ERC20AllowanceRequest containing the owner, spender, and contract address.
   * @returns A promise that resolves to the allowance amount as a string.
   * @throws Will throw an error if the API call fails.
   */
  public async allowance(request: ERC20AllowanceRequest): Promise<string> {
    const data = await this.apiClient.get<string>(
      '/erc20/allowance/' + request.contractAddress,
      { owner: request.owner, spender: request.spender }
    )
    if (data.error) {
      throw new Error(data.error.message)
    }
    return data.data as string
  }

  /**
   * Gets the total token supply.
   * @param request - The ERC20TotalSupplyRequest containing the contract address.
   * @returns A promise that resolves to the total token supply as a string.
   * @throws Will throw an error if the API call fails.
   */
  public async totalSupply(request: ERC20TotalSupplyRequest): Promise<string> {
    const data = await this.apiClient.get<string>(
      '/erc20/totalSupply/' + request.contractAddress
    )
    if (data.error) {
      throw new Error(data.error.message)
    }
    return data.data as string
  }

  // Add any additional ERC20-related methods here if needed
}
