import { type PropsWithChildren, createContext, useEffect, useState } from "react";

import type { TAuthContext, UserState } from "./useAuth.type";

import fetcher from "@/lib/fetcher/fetcher";
import coockie from "@/lib/coockie/coockie";

export const AuthContext = createContext<TAuthContext | undefined>(undefined)

export default function AuthProvider({ children }: PropsWithChildren) {
  const [userState, updateUserState] = useState<UserState>({ isAuthPending: false, isLoading: false })

  useEffect(() => {
    async function isAuth() {
      try {
        const user = userState.user

        if(!user) {
          updateUserState({ isAuthPending: true, isLoading: false })
            
          const response = await fetcher.get<any>('/authenticate', { 'Authorization': `Bearer ${coockie.getOne('PR_TOKEN')}` })
          const isSuccess = Object.hasOwn(response, 'token')
            
          updateUserState({ isAuthPending: false, isLoading: false, error: undefined, user: isSuccess ? response : undefined })
        }
      } catch(error) {
        updateUserState({ isAuthPending: false, isLoading: false, error: undefined, user: undefined })
      }
    }

    isAuth()
  }, [])

  return <AuthContext.Provider value={{ updateUserState, userState }}>{children}</AuthContext.Provider>
}