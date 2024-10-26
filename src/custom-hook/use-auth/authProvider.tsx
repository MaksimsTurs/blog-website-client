import { type PropsWithChildren, createContext, useEffect, useState } from "react";

import type { AuthUser, TAuthContext, UserSession, UserState } from "../use-auth/useAuth.type";

import fetcher from "@/lib/fetcher/fetcher";

import { AUTHORIZATION_OBJECT } from "@/conts";

export const AuthContext = createContext<TAuthContext | undefined>(undefined)

export default function AuthProvider({ children }: PropsWithChildren) {
  const [userState, updateUserState] = useState<UserState>({ isAuthPending: false, isLoading: false,  permissions: { routing: { INDEX: [], SIDE_MENU: [] }}})

  useEffect(() => {
    async function isAuth() {
      try {
        const user: AuthUser | undefined = userState.user

        if(!user) {
          updateUserState(prev => ({...prev, isAuthPending: true, isLoading: false }))
            
          const response = await fetcher.get<UserSession>('/authenticate', AUTHORIZATION_OBJECT)
            
          updateUserState({...response, isAuthPending: false, isLoading: false, error: undefined })
        }
      } catch(error) {
        updateUserState(prev => ({
          ...prev, 
          error: error instanceof Error ? { code: 503, message: 'Service Unavailable!' } : JSON.parse(error as string),
          isAuthPending: false, 
          isLoading: false
        }))
      }
    }

    isAuth()
  }, [])

  return <AuthContext.Provider value={{ updateUserState, userState }}>{children}</AuthContext.Provider>
}