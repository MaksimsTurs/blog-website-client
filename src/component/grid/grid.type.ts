import { PropsWithChildren, SyntheticEvent } from "react"

export type GridWrapperProps = PropsWithChildren<{
  size?: string
  gap?: string
}>

export type GridWrapperItemProps = PropsWithChildren<{
  icon?: string
  onClick: (event: SyntheticEvent<HTMLElement>) => any
}>

export type GridWrapperButtonProps = PropsWithChildren<{ onClick: (event: SyntheticEvent<HTMLButtonElement>) => any }>