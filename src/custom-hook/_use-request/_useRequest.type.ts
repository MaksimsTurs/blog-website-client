import type { ServerResponseError } from "@/global.type"

export type _UseRequestParams<T> = {
  deps: string[]
  prev?: string[]
  noCache?: boolean
  enabled?: boolean
  request?: (deps: string[]) => Promise<T>
}

export type _UseRequestReturn<T> = {
  mutate: <C>(option: _MutateParams<C & T>) => Promise<void>
  request: () => Promise<void>
  changeError: (key: string[], error?: ServerResponseError) => void
  isFetching: boolean
  isPending: boolean
  isMutating?: boolean
  error?: ServerResponseError
  data?: T
  prev?: T
}

export type _MutateParams<C> = {
  key: string[]
  request: (option: _MutateRequestFunctionParams<C>) => Promise<C | undefined>
}

export type _MutateRequestFunctionParams<C> = {
  deps: string[]
  removeCache: (key: string) => void
  state: C | undefined
}
