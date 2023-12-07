import { ApiClient } from '../ApiClient'

/**
 * Interface representing a user.
 */

export interface User {
  handle: string
  wallet: {
    address: string
  }
}
/**
 * Class handling the API calls related to user information and accounts.
 */
export class UserApi {
  private apiClient: ApiClient

  /**
   * Constructs a UserApi instance.
   * @param apiClient - The ApiClient instance for making API calls.
   */
  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient
  }

  /**
   * Retrieves the user details.
   * @returns A promise that resolves to a User object.
   * @throws Will throw an error if the API call fails or returns an error.
   */
  public async getUser(): Promise<User> {
    const data = await this.apiClient.get<User>('/user')
    if (data.error) {
      throw new Error(data.error.message)
    }
    return data.data as User
  }

  /**
   * Retrieves the balance of the user.
   * @returns A promise that resolves to the balance as a string.
   * @throws Will throw an error if the API call fails or returns an error.
   */
  public async getBalance(): Promise<string> {
    const data = await this.apiClient.get<string>('/user/balance')
    if (data.error) {
      throw new Error(data.error.message)
    }
    return data.data as string
  }

  /**
   * Retrieves the accounts associated with the user.
   * @returns A promise that resolves to an array of account strings.
   * @throws Will throw an error if the API call fails or returns an error.
   */
  public async getAccounts(): Promise<string[]> {
    const data = await this.apiClient.get<string[]>('/user/accounts')
    if (data.error) {
      throw new Error(data.error.message)
    }
    return data.data as string[]
  }
}
