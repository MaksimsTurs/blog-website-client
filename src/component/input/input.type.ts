import type { FormFieldsError } from "@/custom-hook/useForm/useForm.type"
import type { MutableRefObject, SyntheticEvent } from "react"

export type InputProps = {
  attributes: {
    type: 'text' | 'number' | 'password' | 'email' | 'file'
    name: string
    placeholder?: string
    value?: any
    defaultValue?: any
    onInput?: (event: SyntheticEvent<HTMLInputElement | any>) => any
  }
  errors?: FormFieldsError
}

export type FileInputProps = {
  label: string
  initValue?: string
  asset?: MutableRefObject<File | undefined>
  isChange?: boolean
  supportedFormats?: ('image/webp' | 'image/jpg' | 'image/png' | 'image/jpeg' | 'video/mp4')[]
} & Pick<InputProps['attributes'], 'name'>

export type _InputProps = {
  type: 'text' | 'number' | 'password' | 'email' | 'file'
  name: string
  placeholder?: string
  defaultValue?: any
  errors?: FormFieldsError
  onInput?: (event: SyntheticEvent<HTMLInputElement | any>) => any
}

export type TextAreaProps = {
  getValue?: (string: string) => any
} & Pick<_InputProps, 'placeholder' | 'defaultValue'>

export type TextInputProps = {
  value?: string
} & Partial<Pick<_InputProps, 'type'>> & Pick<_InputProps, 'onInput' | 'defaultValue' | 'errors' | 'name' | 'placeholder'>

export type TextTagInputProps = { getTags(tags: string[]): void } & Pick<InputProps['attributes'], 'placeholder' | 'value'>

export type CheckBoxInputProps = Pick<FileInputProps, 'label'> & Pick<InputProps['attributes'], 'name' | 'defaultValue'>