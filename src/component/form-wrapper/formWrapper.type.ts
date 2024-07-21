import type { CSSProperties, ReactNode, SyntheticEvent } from "react"

export type FormWrapperProps = {
  errors?: string[]
  isPending?: boolean
  buttonLabel?: string 
  title?: string | ReactNode
  className?: string
  style?: CSSProperties
  onSubmit: (event: SyntheticEvent) => any
}