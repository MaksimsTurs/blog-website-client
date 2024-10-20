import type { CSSProperties, PropsWithChildren, SyntheticEvent } from "react"

export type FormWrapperProps = PropsWithChildren<{
  errors?: string[]
  isPending?: boolean
  buttonLabel?: string 
  className?: string
  style?: CSSProperties
  onSubmit: (event: SyntheticEvent) => any
}>