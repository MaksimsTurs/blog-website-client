import { type PropsWithChildren, createContext, useEffect, useState } from "react";

import type { TAuthContext, UserSession, UserState } from "../use-auth/useAuth.type";

import fetcher from "@/lib/fetcher/fetcher";

import { AUTHORIZATION_OBJECT } from "@/conts";

export const AuthContext = createContext<TAuthContext | undefined>(undefined)

const DEFAULT_ROUTES = [
  { title: 'Home',           path: '/' },
  { title: 'Suchen',         path: '/search' },
  { title: 'Einstellungen',  path: '/setting' },
  { title: 'Galerie',        path: '/galery' },
  { title: 'Datenbank',      path: '/database' },
  { title: 'About',          path: '/about' } 
]

export default function AuthProvider({ children }: PropsWithChildren) {
  const [userState, updateUserState] = useState<UserState>({ isAuthPending: false, isLoading: false, permissions: { routing: DEFAULT_ROUTES }})

  useEffect(() => {
    async function isAuth() {
      try {
        const user = userState.user

        if(!user) {
          updateUserState(prev => ({...prev, isAuthPending: true, isLoading: false }))
            
          const response = await fetcher.get<UserSession>('/authenticate', AUTHORIZATION_OBJECT)
            
          updateUserState({...response, isAuthPending: false, isLoading: false, error: undefined })
        }
      } catch(error) {
        updateUserState(prev => ({...prev, isAuthPending: false, isLoading: false, error: undefined, user: undefined }))
      }
    }

    isAuth()
  }, [])

  return <AuthContext.Provider value={{ updateUserState, userState }}>{children}</AuthContext.Provider>
}