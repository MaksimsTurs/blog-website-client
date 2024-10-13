import type { SyntheticEvent } from "react"

export type ButtonProps = {
  label?: string
  className?: string
  type?: 'submit'
  isDisable?: boolean
  onClick?: (event: SyntheticEvent<HTMLButtonElement>) => any
}