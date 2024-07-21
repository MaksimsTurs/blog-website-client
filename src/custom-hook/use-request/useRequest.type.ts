import type { ServerResponseError } from "@/global.type"
import type { Dispatch, SetStateAction } from "react"

export type TRequestContext<T = any> = { cache?: CacheStorage<T>, change?: ChangeCache }

export type CacheStorage<T = any> = { [key: string]: RequestState<T> }

export type ChangeCache<T = any> = Dispatch<SetStateAction<CacheStorage<T> | undefined>>

export type UseRequestParam<T> = {
  key: string
  func?: () => Promise<T>
  paginationOptions?: PaginationOptions
  noCache?: boolean
  slideOnRequestEnd?: boolean
}

export type PaginationOptions = {
  dataPerPage: number
  redirectURLOnPageIsFull?: `${string}{page}`
  currPage: number
  updateType?: 'REPLACE_PAGE_DATA' | 'PUSH_RESPONSE_OBJECT'
}

export type RequestState<T> = {
  isPending: boolean
  isMutating?: boolean
  error?: ServerResponseError
  data?: T
  pagesCount?: number
}

export type MutateParams<C> = { redirect?: string, func: (currState: C) => Promise<C> }