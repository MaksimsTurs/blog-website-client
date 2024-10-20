import type { FormFieldsErrors, FormFieldsRegisterCallback } from "@/custom-hook/use-form/useForm.type"
import type { SyntheticEvent } from "react"

export type InputProps = {
  attributes: {
    type: 'text' | 'number' | 'password' | 'email' | 'file'
    name: string
    placeholder?: string
    value?: any
    defaultValue?: any
    onInput?: (event: SyntheticEvent<HTMLInputElement | any>) => any
  }
  errors?: FormFieldsErrors
}

export type InputAttributes = {
  type: 'text' | 'number' | 'password' | 'email' | 'file'
  name: string
  register?: FormFieldsRegisterCallback
  errors?: FormFieldsErrors
  placeholder?: string
  defaultValue?: any
  value?: string
  onInput?: (event: SyntheticEvent<HTMLInputElement | any>) => any
}

export type TextAreaProps = Pick<InputAttributes, 'placeholder' | 'defaultValue'>
