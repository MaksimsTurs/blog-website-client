import type { ServerResponseError } from "@/global.type"
import type { Dispatch, SetStateAction } from "react"

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

export type _MutateParams<C = any> = {
  key: string[]
  request: (option: _MutateRequestFunctionParams<C>) => Promise<C | undefined>
}

export type _MutateRequestFunctionParams<C = any> = {
  deps: string[]
  removeCache: (key: string) => void
  state: C | undefined
}

export type TRequestContext<T = any> = {
  cache?: { [key: string]: RequestState<T> }
  change?: Dispatch<SetStateAction<{ [key: string]: RequestState<T> }>>
}

export type RequestState<T = any> = {
  isPending: boolean
  isFetching: boolean
  isMutating: boolean
  error?: ServerResponseError
  data?: T
}