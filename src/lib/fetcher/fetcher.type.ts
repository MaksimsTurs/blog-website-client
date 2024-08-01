export type Fetcher = {
  baseURL: string 
  formatURL: any
  formatInit: any
  get: <T>(url: string, headers?: any) => Promise<T>
  post: <T>(url: string, body?: any, headers?: any) => Promise<T>
}