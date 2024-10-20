import type { PropsWithChildren } from "react"

export type SelectInputWrapperProps = PropsWithChildren<{ title: string, className?: string, pagesCount?: number }>

export type SelectInputItemProps = PropsWithChildren<{ value: string }>