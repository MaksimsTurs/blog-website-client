import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "./authProvider";

import fetcher from "@/lib/fetcher/fetcher";
import coockie from "@/lib/coockie/coockie";

import type { CreateParams, UserSession } from "./useAuth.type";

import useSearchParams from "../use-search-params/useSearchParams";

import { URL_SEARCH_PARAMS } from "@/conts";

export default function useAuth() {
  const redirect = useNavigate()
  const userContext = useContext(AuthContext)

  const searchParams = useSearchParams()

  const isLogOpen: string | null = searchParams.get(URL_SEARCH_PARAMS["IS-LOGIN-MODAL-OPEN"])
  const isRegOpen: string | null = searchParams.get(URL_SEARCH_PARAMS["IS-REGISTRATE-MODAL-OPEN"])

  return {
    ...userContext?.userState,
    create: async function(params: CreateParams): Promise<void> {
      try {
        if(params.setSession) return userContext?.updateUserState({...params.setSession, isAuthPending: false, isLoading: false })
          
        userContext?.updateUserState(prev => ({...prev, isAuthPending: false, isLoading: true }))
        
        const response = await fetcher.post<UserSession>(params.apiURL!, params.body)
        
        userContext?.updateUserState({...response, isAuthPending: false, isLoading: false, error: undefined })

        if(params?.setToken) coockie.set('PR_TOKEN', response?.user?.token)
        if(params?.redirectURL) redirect(params.redirectURL)
      } catch(error) {
        userContext!.updateUserState!(prev => ({...prev, isAuthPending: false, isLoading: false, error: error instanceof Error ? { code: 503, message: 'Service Unavailable!' } : JSON.parse(error as string) }))
      }
    },
    out: function(): void {
      userContext?.updateUserState(prev => ({...prev, isAuthPending: false, isLoading: false }))
      coockie.set('PR_TOKEN', 'undefined')
    },
    clearError: function(): void {
      useEffect(() => {
        userContext?.updateUserState(prev => ({...prev, error: undefined }))
      }, [isLogOpen, isRegOpen])
    }
  }
}