import type { FieldValues } from "react-hook-form"
import type { InputAttributes } from "../input.type"
import type { SyntheticEvent } from "react"

export type TextInputProps<T extends FieldValues> = {
  onInput?: (event: SyntheticEvent<HTMLInputElement>) => any
  value?: any
} & Omit<InputAttributes<T>, 'disabled'>