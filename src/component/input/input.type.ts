import type { UseFormRegister, FieldValues, FieldErrors, Path, RegisterOptions } from "react-hook-form"

export type InputAttributes<T extends FieldValues> = {
  type: 'text' | 'number' | 'password' | 'email' | 'file' | 'checkbox'
  name: Path<T>
  errors?: FieldErrors<T>
  placeholder?: string
  disabled?: boolean
  validation?: Pick<RegisterOptions<T, Path<T>>, 'max' | 'maxLength' | 'min' | 'minLength' | 'required' | 'pattern' | 'validate'>
  className?: string
  defaultValue?: any
  register?: UseFormRegister<T>
}