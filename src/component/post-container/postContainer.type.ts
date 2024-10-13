import type { User, Content } from "@/global.type"
import type { Dispatch, SetStateAction } from "react"

export type PostContainerProps = { post: Content, type: 'preview' | 'post' | 'comment', setToQuote?: Dispatch<SetStateAction<Content[]>>, isQuoted?: boolean }
export type PostWrapperProps = { className?: string }
export type PostTagsProps = { tags: string[] }
export type PostHeaderProps = { user?: User, type: PostContainerProps['type'], isHidden: boolean, content: string, title: string, tags: string[], contentID: string, postID: string } & Pick<Content, 'createdAt' | 'isHidden'>
export type PostQuotesProps = { content: Content }