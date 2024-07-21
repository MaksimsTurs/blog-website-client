import type { Content, User } from "@/global.type";
import type { Dispatch, SetStateAction } from "react";

export type UserDataHeaderProps = { user: User, setIsVisible: Dispatch<SetStateAction<boolean>> }

export type UserContentListProps = { user: User, userContent: UserContentData }

export type UserContentData = { pagesCount: number, content: Content[] }

export type EditUserProps = { isVisible: boolean, _id: string, setIsVisible: Dispatch<SetStateAction<boolean>> }