import type { FormFieldsErrors, FormFieldsRegisterCallback } from "@/custom-hook/use-form/useForm.type"
import type { MutableRefObject, PropsWithChildren, SyntheticEvent } from "react"

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

export type FileInputProps = {
  label: string
  initValue?: string
  asset?: MutableRefObject<File | undefined>
  isChange?: boolean
  supportedFormats?: ('image/webp' | 'image/jpg' | 'image/png' | 'image/jpeg' | 'video/mp4')[]
} & Pick<InputProps['attributes'], 'name'>

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

export type TextAreaProps = {
  getValue?: (string: string) => any
} & Pick<InputAttributes, 'placeholder' | 'defaultValue'>

export type TextTagInputProps = { 
  getTags?: (tags: string[]) => void 
  value?: string[]
} & Pick<InputAttributes, 'placeholder'>

export type TextInputProps = Partial<Pick<InputAttributes, 'type' | 'value' | 'register'>> & Pick<InputAttributes, 'onInput' | 'errors' | 'name' | 'placeholder'>

export type CheckBoxInputProps = Pick<FileInputProps, 'label'> & Pick<InputAttributes, 'name' | 'onInput' | 'register' | 'errors'>

export type SelectInputWrapperProps = PropsWithChildren<{ title: string, className?: string, pagesCount?: number }>

export type SelectInputItemProps = PropsWithChildren<{ value: string }>