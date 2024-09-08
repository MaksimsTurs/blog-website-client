import { useContext, useEffect, useRef, useState } from "react";
import { RequestContext } from "./requestProvider";

import type { UseRequestParams, UseRequestReturn, TRequestContext } from "./useRequest.type";
import type { ServerResponseError } from "@/global.type";

//isPending is true when any of async function execute.
//isFetching is true only in when component mount.

function isUndefined(some: any) {
  return typeof some === 'undefined'
}

export default function _useRequest<T>(reqParam: UseRequestParams<T>): UseRequestReturn<T> {
  const [error, setError] = useState<ServerResponseError | undefined>()

  const cacheKey = reqParam.deps.join('-')
  const prevKey = reqParam.prev?.join('-')

  const context: TRequestContext<T> | undefined = useContext(RequestContext)

  const currState = context?.cache?.[cacheKey]
  const prev = context?.cache?.[prevKey || 'NO_DATA']?.data

  let local = useRef<any>(), initRender = useRef<boolean>(true)

  function changeError(error?: ServerResponseError): void {
    setError(() => error)
  }

  async function request() {
    if(!currState?.data && reqParam.request) {
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
        const passError: ServerResponseError = error instanceof Error ? { code: 503, message: 'Service Unavailable!' } : JSON.parse(error as string)
        context!.change!(prev => ({...prev, [cacheKey]: { isFetching: false, isMutating: false, isPending: false }}))
        setError(passError)
      }
    } else {
      context!.change!(prev => ({...prev, [cacheKey]: { isFetching: false, isMutating: false, isPending: false, data: currState?.data }}))
    }
    initRender.current = false
  }

  useEffect(() => {
    if(reqParam.enabled || typeof reqParam.enabled === 'undefined') request()
  }, reqParam.deps)

  return {
    ...currState, 
    error,
    data: reqParam.noCache ? local.current : currState?.data,
    isPending: isUndefined(currState?.isPending) ? true : currState.isPending,
    isFetching: initRender.current && !error,
    prev,
    request,
    changeError
  }
}