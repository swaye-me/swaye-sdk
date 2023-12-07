interface ApiResponse<T> {
  data?: T
  error?: ApiError
}
class ApiClient {
  private baseUrl: string
  private bearerToken: string

  constructor(baseUrl: string, bearerToken?: string) {
    this.baseUrl = baseUrl
    // Initialize bearerToken with an empty string or fetch it from a secure source
    this.bearerToken = bearerToken || ''
  }

  // Method to set the bearer token
  public setBearerToken(token: string): void {
    this.bearerToken = token
  }

  private toQueryString(params: Record<string, any>): string {
    const queryParts = Object.entries(params).map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    return queryParts.length > 0 ? `?${queryParts.join('&')}` : ''
  }

  private async request<T>({
    endpoint,
    method,
    params,
    body,
  }: {
    endpoint: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    params?: Record<string, any>
    body?: any
  }): Promise<ApiResponse<T>> {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    if (this.bearerToken) {
      headers.append('Authorization', `Bearer ${this.bearerToken}`)
    }

    const url = `${this.baseUrl}${endpoint}${this.toQueryString(params || {})}`
    const requestOptions: RequestInit = {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    }
    try {
      const response = await fetch(url, requestOptions)
      if (!response.ok) {
        return {
          error: { message: response.statusText, code: response.status },
        }
      }
      const data = (await response.json()) as T
      return { data }
    } catch (error) {
      console.log(error)
      throw new Error(`ApiClient request failed: ${error}`)
    }
  }

  public get<T>(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ endpoint, method: 'GET', params })
  }

  public post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>({ endpoint, method: 'POST', body })
  }

  // Additional methods for PUT, DELETE etc. can be added similarly
}
interface ApiError {
  message: string
  code?: number
}
export { ApiClient }
