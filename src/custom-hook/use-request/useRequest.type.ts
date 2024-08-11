import type { KeyValueObject, ServerResponseError } from "@/global.type"
import type { Dispatch, SetStateAction } from "react"

export type UseRequestParams<T> = {
  deps: string[]
  prev?: string[]
  noCache?: boolean
  enabled?: boolean
  request?: (deps: string[]) => Promise<T>
}

export type UseRequestReturn<T> = {
  request: () => Promise<void>
  changeError: (error?: ServerResponseError) => void
  isFetching: boolean
  isPending: boolean
  isMutating?: boolean
  error?: ServerResponseError
  data?: T
  prev?: T
}

export type TRequestContext<T = any> = {
  cache?: KeyValueObject<RequestState<T>>
  change?: Dispatch<SetStateAction<KeyValueObject<RequestState<T>> | undefined>>
}

export type RequestState<T = any> = {
  isPending: boolean
  isFetching: boolean
  isMutating: boolean
  data?: T
}