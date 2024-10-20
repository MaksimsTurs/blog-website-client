import { InputAttributes } from "../input.type"

export type TextInputProps = { name: string } & Partial<Pick<InputAttributes, 'placeholder' | 'type' | 'value' | 'errors'  | 'register'  | 'onInput'>>