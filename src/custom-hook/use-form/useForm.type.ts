import type { KeyValueObject } from "@/global.type"

export type FormState = { errors?: FormFieldsErrors }

export type FormFieldsErrors = KeyValueObject<string | undefined>

export type FormFieldsRegisterCallback = (name: string) => FormFieldsRegisterReturn

export type FormFieldsRegisterReturn = {
  name: string
  value?: any
  checked?: boolean
  onChange?: (event: any) => any
}

export type FormFieldsValidation<T> = Partial<Record<keyof T, FormFieldsValidationOption<T>>>

export type FormFieldsValues<T, R> = Partial<Record<keyof T, R>>

export type FormFieldsRegisterOption = {
  value?: any
}

export type FormFieldsValidationObject = {
  isMin: (message?: string, value?: number, toCheck?: any) => string | undefined
  isMax: (message?: string, value?: number, toCheck?: any) => string | undefined
  isEqual: (message?: string, value?: any, toCompare?: any) => string | undefined
  isPattern: (message?: string, value?: any, pattern?: RegExp) => string | undefined
}

type FormFieldsValidationOption<T> = {
  isMin?: { value: number, message: string }
  isMax?: { value: number, message: string }
  isPattern?: { value: RegExp, message: string }
  isEqual?: { message: string, compareWith: keyof T }
}