import { useSearchParams as useSearchParamsRouterDom } from "react-router-dom"

import type { KeyValueObject } from "@/global.type"

export default function useSearchParams() {
  const [searchParams, setSearchParams] = useSearchParamsRouterDom()

  const get = (key: string) => {
    return searchParams.get(key)
  }

  const set = (searchParamsObject: KeyValueObject) => {
    const entries = Object.entries(searchParamsObject)
    setSearchParams(prev => {
      for(let [key, value] of entries) prev.set(key, value)
      return prev
    })
  }

  const remove = (keys: string[]) => {
    setSearchParams(prev => {
      for(let index: number = 0; index < keys.length; index++) prev.delete(keys[index])
      return prev
    })
  }

  return { get, set, remove }
}