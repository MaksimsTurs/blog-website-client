import { SyntheticEvent } from "react"

export type GridWrapperProps = {
  size?: string
  gap?: string
}

export type GridWrapperItemProps = {
  icon?: string
  onClick: (event: SyntheticEvent<HTMLElement>) => any
}

export type GridWrapperButtonProps = {
  onClick: (event: SyntheticEvent<HTMLButtonElement>) => any
}