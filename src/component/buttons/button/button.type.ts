import type { PropsWithChildren, SyntheticEvent } from "react"

export type ButtonProps = PropsWithChildren<{
  className?: string
  type?: 'submit'
  isDisable?: boolean
  onClick?: (event: SyntheticEvent<HTMLButtonElement>) => any
}>