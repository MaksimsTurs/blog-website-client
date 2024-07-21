import type { Content, User } from "@/global.type";
import { FunctionComponent } from "react";

export type WebsiteContent = { posts: ContentData<Content>, comments: ContentData<Content>, users: ContentData<User> }

export type ContentData<T> = { pagesCount: number, data: T[] }

export type ContentPreviewProps = { contentData: Content, authorData?: User } 
export type UserPreviewProps = { user: User }

export type SimpleDataProps = { propKey: string, propValue: any, useParser?: boolean, useCopyBoard?: boolean }
export type DataModalWrapperProps<T> = { Component: FunctionComponent<{ data: T }> }

export type AdminActionButtonProps = { optionAction: { actionType: 'remove' | 'edit' }}