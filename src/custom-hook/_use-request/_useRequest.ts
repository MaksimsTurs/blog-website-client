import { useContext, useEffect, useRef } from "react";
import { RequestContext } from "./requestProvider";

import type { _MutateParams, _UseRequestParams, _UseRequestReturn, TRequestContext, RequestState } from "./_useRequest.type";
import type { ServerResponseError } from "@/global.type";

//isPending is true when any of async function execute.
//isFetching is true only in when component mount.

function isUndefined(some: any) {
  return typeof some === 'undefined'
}

export default function _useRequest<T>(reqParam: _UseRequestParams<T>): _UseRequestReturn<T> {
  const cacheKey = reqParam.deps.join('-')
  const prevKey = reqParam.prev?.join('-')

  const context: TRequestContext<T> | undefined = useContext(RequestContext)

  const currState = context?.cache?.[cacheKey]
  const prev = context?.cache?.[prevKey || 'NO_DATA']?.data

  let local = useRef<any>(), initRender = useRef<boolean>(true)

  function changeError(key: string[], error?: ServerResponseError) {
    context?.change?.(prev => ({...prev || {}, [key.join('-')]: {...(prev || {})?.[key.join('-')] || {}, error }}))
  }

  async function mutate<C>(mutateParam: _MutateParams<C>) {
    const { key, request } = mutateParam
    const state = context?.cache?.[mutateParam.key.join('-')] as any

    try {
      context!.change!(prev => ({...prev, [key.join('-')]: {...state, isPending: false, isMutating: true }}))
      const response: Awaited<C> | undefined = await request({ 
        deps: mutateParam.key,
        state: state?.data,
        removeCache: function (key: string) {
          context?.change?.(prev => ({...prev, [key]: {...state, isPending: false, data: undefined } }))
        }
      })

      if(!response) return

      if(reqParam.noCache) {
        local.current = response
        context?.change?.(prev => ({...prev, [key.join('-')]: {...state, isPending: false, isMutating: false }}))
        return
      }
      context?.change?.(prev => ({...prev, [key.join('-')]: {...state, isPending: false, isMutating: false, data: response }}))
    } catch(error) {
      context!.change!(prev => ({...prev, [key.join('-')]: {...state, isPending: false, isMutating: false, error: JSON.parse(error as string) }}))
    }
  }

  async function request() {
    const cache = context?.cache?.[cacheKey]?.data

    if(!cache && reqParam.request) {
      context!.change!(prev => ({...prev, [cacheKey]: { isFetching: true, isPending: true, isMutating: false }}))
      try {
        const response = await reqParam.request(reqParam.deps)
        if(reqParam.noCache) {
          local.current = response
          context!.change!(prev => ({...prev, [cacheKey]: { isFetching: false, isPending: false, isMutating: false }}))
          return
        }
        context!.change!(prev => ({...prev, [cacheKey]: { data: response, isFetching: false, isPending: false, isMutating: false }}))
      } catch(error) {
        context!.change!(prev => ({
          ...prev, 
          [cacheKey]: { isFetching: false, isMutating: false, isPending: false, error: error instanceof Error ? { code: 503, message: 'Service Unavailable!' } : JSON.parse(error as string) }
        }))
      }
    } else {
      context!.change!(prev => ({...prev, [cacheKey]: { isFetching: false, isMutating: false, isPending: false, data: cache }}))
    }
    initRender.current = false
  }

  useEffect(() => {
    if(reqParam.enabled || typeof reqParam.enabled === 'undefined') request()
  }, reqParam.deps)

  return {
    ...currState, 
    data: reqParam.noCache ? local.current : currState?.data,
    isPending: isUndefined(currState?.isPending) ? true : currState.isPending,
    isFetching: initRender.current && !currState?.error,
    prev,
    mutate,
    request,
    changeError
  }
}