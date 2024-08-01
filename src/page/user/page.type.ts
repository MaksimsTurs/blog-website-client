import type { Content, User } from "@/global.type";

export type UserDataHeaderProps = { user: User }

export type UserContentListProps = { user: User, userContent: UserContentData }

export type UserContentData = { pagesCount: number, content: Content[] }

export type EditUserProps = { _id: string }