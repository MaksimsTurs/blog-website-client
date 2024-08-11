import { useContext, useState } from "react";

import { RequestContext } from "./requestProvider";

import type { ServerResponseError } from "@/global.type";
import type { TRequestContext } from "./useRequest.type";
import type { MutateRequestFunctionParams } from "./useMutate.type";

export default function useMutate<T>(key: string) {
  const [error, setError] = useState<ServerResponseError | undefined>()

  const context: TRequestContext<T> | undefined = useContext(RequestContext)

  const state = context?.cache?.[key]

  function changeError(error?: ServerResponseError): void {
    setError(() => error)
  }

  async function mutate(request: (option: MutateRequestFunctionParams<T>) => Promise<T | undefined>) {
    const state = context?.cache?.[key] as any

    try {
      context!.change!(prev => ({...prev, [key]: {...state, isMutating: true }}))

      const response: Awaited<T> | undefined = await request({ 
        deps: key,
        state: state?.data,
        removeCache: function (key: string) {
          context?.change?.(prev => ({...prev, [key]: {...state, data: undefined } }))
        }
      })

      if(!response) return

      context?.change!(prev => ({...prev, [key]: {...state, isMutating: false, data: response }}))
      setError(() => undefined)
    } catch(error) {
      const passError: ServerResponseError = error instanceof Error ? { code: 503, message: 'Service Unavailable!' } : JSON.parse(error as string) 
      setError(() => passError)
      context!.change!(prev => ({...prev, [key]: {...state, isMutating: false }}))
    }
  }

  return {...state, error, mutate, changeError }
}