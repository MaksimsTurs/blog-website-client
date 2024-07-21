import type { Content, User } from "@/global.type"

export type CommentContainerProps = { postID: string, page: number, isPostHidden: boolean }

export type PreviewAuthorDataProps = { author: User }

export type PostCommentsData = { comments: Content[], pagesCount: number }