import type { SyntheticEvent } from "react"

export type ConfirmModalProps = {
  text: string
  onConfirm: (event: SyntheticEvent<HTMLButtonElement>) => any
}