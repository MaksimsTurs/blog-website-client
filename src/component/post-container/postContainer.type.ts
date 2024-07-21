import type { User, Content } from "@/global.type"

export type PostContainerProps = { post: Content, type: 'preview' | 'post' | 'comment' }
export type PostWrapperProps = { className?: string }
export type PostTagsProps = { tags: string[] }
export type PostHeaderProps = { user?: User, type: PostContainerProps['type'], content: string, title: string, tags: string[], contentID: string, postID: string } & Pick<Content, 'createdAt' | 'isHidden'>