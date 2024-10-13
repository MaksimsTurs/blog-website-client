import type { Content, User } from "@/global.type";
import type { FunctionComponent, PropsWithChildren } from "react";

export type WebsiteContent = { posts: ContentData<Content>, comments: ContentData<Content>, users: ContentData<User> }

export type ContentData<T> = { pagesCount: number, data: T[] }

export type ContentPreviewProps = { contentData: Content, authorData?: User } 
export type UserPreviewProps = { user: User }

export type SimpleDataProps = { propKey: string, propValue: any, useLink?: boolean, useCopyBoard?: boolean }
export type DataModalWrapperProps<T> = { Component: FunctionComponent<{ data: T }> }

export type AdminActionButtonProps = { optionAction: { actionType: 'remove' | 'edit' }, contentData?: Partial<Content> }

export type ViewComponentProps<T> = { data?: T }
export type ViewWrapperProps = PropsWithChildren<{ form: JSX.Element, title: string }>
export type EditViewProps<T> = { defaultValue?: T }