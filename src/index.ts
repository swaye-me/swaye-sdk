import { ApiClient } from './api/ApiClient'
import { BlockApi } from './api/endpoints/BlockApi'
import { ERC20Api } from './api/endpoints/ERC20Api'
import { TransactionApi } from './api/endpoints/TransactionApi'
import { UserApi } from './api/endpoints/UserApi'
import { ERC721Api } from './api/endpoints/ERC721Api'
import { ChainApi } from './api/endpoints/ChainApi'
import { ContractApi } from './api/endpoints/ContractApi'

/**
 * Represents a client for interacting with various blockchain APIs.
 */
export class SwayeClient {
  /** Handles blockchain block related operations */
  public block: BlockApi

  /** Handles ERC20 token related operations */
  public erc20: ERC20Api

  /** Manages blockchain transaction operations */
  public transaction: TransactionApi

  /** Manages user related operations in the blockchain context */
  public user: UserApi

  /** Handles ERC721 token related operations */
  public erc721: ERC721Api

  /** Manages operations related to blockchain chains */
  public chain: ChainApi

  /** Manages smart contract related operations */
  public contract: ContractApi

  /** Internal API client for making HTTP requests */
  private apiClient: ApiClient

  /**
   * Constructs a new Client instance.
   * @param baseUrl The base URL for the API client.
   * @param bearerToken The bearer token for authentication.
   */
  constructor(baseUrl: string, bearerToken?: string) {
    this.apiClient = new ApiClient(baseUrl)
    if (bearerToken) {
      this.apiClient.setBearerToken(bearerToken)
    }

    this.block = new BlockApi(this.apiClient)
    this.erc20 = new ERC20Api(this.apiClient)
    this.transaction = new TransactionApi(this.apiClient)
    this.user = new UserApi(this.apiClient)
    this.erc721 = new ERC721Api(this.apiClient)
    this.chain = new ChainApi(this.apiClient)
    this.contract = new ContractApi(this.apiClient)
  }

  /**
   * Sets or updates the bearer token for authentication.
   * @param bearerToken The new bearer token.
   */
  public setBearerToken(bearerToken: string) {
    this.apiClient.setBearerToken(bearerToken)
  }
}
