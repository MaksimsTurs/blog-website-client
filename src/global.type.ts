export type KeyValueObject<T = any> = { [key: string]: T }

export type ServerResponseError = { code: number, message: string }

export type UserRoles = 'User' | 'Admin' | 'Creator'

export type User = {
  _id: string
  name: string
  email: string
  password: string
  confirmPassword: string
  avatar: string
  token: string
  likedContent: Content[]
  myContent: Content[]
  createdAt: string
  updatedAt: string
  ban?: string
  role: UserRoles
}

export type Content = {
  _id: string
  author?: User
  post?: Content
  title?: string
  viewedBy?: string[]
  comments?: Content[]
  tags?: string[]
  content: string
  isHidden: boolean
  likedBy: string[]
  createdAt: string
  updatedAt: string
}

export type Galery = {
  _id: string
  title: string
  countOfImg: number
  countOfVideos: number
  galerySize: number
  content: { url: string, description?: string }[]
}

export type Database = {
  _id: string
  title: string
  content: string
  thumbnail: string
}