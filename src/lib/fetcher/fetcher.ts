import type { Fetcher } from "./fetcher.type"

export default {
  baseURL: import.meta.env.DEV ? 'http://localhost:4000' : 'https://fuck-putler.vercel.app',
  formatURL: function(URL: string) {
    if(this.baseURL) return `${this.baseURL}${URL}`
    return URL
  },
  formatInit: function(body?: any, headers?: any) {
		let init = { headers: headers || {}, body: body || {} }

		if(body && !(body instanceof FormData)) {
			if(!headers) init.headers = { 'Content-Type': 'application/json' }
			if(headers && !('Content-Type' in headers)) init.headers = {...init.headers, 'Content-Type': 'application/json'}
			return {...init, body: JSON.stringify(body) }
		}
	
		return init
  },
  get: async function<T>(URL: string, headers?: any) {
    const response = await fetch(this.formatURL(URL), { headers: this.formatInit(undefined, headers).headers })
    const data = await response.json()

    if(!response.ok) throw JSON.stringify(data)

    return await data as T
  },
  post: async function<T>(URL: string, body?: any, headers?: any) { 
    const init = this.formatInit(body, headers)
    const response = await fetch(this.formatURL(URL), { method: 'POST', body: init.body, headers: init.headers})
    const data = await response.json()

    if(!response.ok) throw JSON.stringify(data)
    
    return await data as T
  }
} as Fetcher