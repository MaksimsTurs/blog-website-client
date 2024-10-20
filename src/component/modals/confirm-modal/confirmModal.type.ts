import type { SyntheticEvent } from "react"

export type ConfirmModalProps = {
  text: string
  title?: string
  onConfirm: (event: SyntheticEvent<HTMLButtonElement>) => any
}