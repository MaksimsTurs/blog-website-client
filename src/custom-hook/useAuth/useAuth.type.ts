import type { ServerResponseError } from "@/global.type"
import type { User } from "@/global.type"
import type { Dispatch, SetStateAction } from "react"

export type TAuthContext = {
  updateUserState: Dispatch<SetStateAction<UserState>>
  userState: UserState
}

export type UserState = {
  isAuthPending: boolean
  isLoading: boolean
  user?: UserSessionData
  error?: ServerResponseError
}

export type UserSessionData = Pick<User, '_id' | 'avatar' | 'name' | 'token' | 'role'>

export type CreateParams = { body?: any, apiURL?: string, redirectURL?: string, setToken?: boolean, setSession?: UserSessionData }