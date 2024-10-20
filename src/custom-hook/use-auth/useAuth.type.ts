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
  permissions: Permissions
  user?: AuthUser
  error?: ServerResponseError
}

export type AuthUser = Pick<User, '_id' | 'avatar' | 'name' | 'token' | 'role'>

export type UserSession = { user?: AuthUser, permissions: Permissions }

export type CreateParams = { body?: any, apiURL?: string, redirectURL?: string, setToken?: boolean, setSession?: UserSession }

export type Permissions = {
  routing: { title: string, path: string }[]
}