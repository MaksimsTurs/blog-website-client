export type FormState = { errors?: FormFieldsError }

export type FormFieldsError = { [key: string]: string | undefined }

export type ValidationFunctions = 'isMax' | 'isMin' | 'isPattern' | 'isEqualWith'

export type ValidationOptionString = `${ValidationFunctions}:${string}:${string}`

export type ValidationOptionStringData<T> = [keyof T, ValidationOptionString[] | ValidationOptionString | undefined]

export type ValidationFunctionObject = {
  'isMax': (checker: number, toCheck: any) => false | undefined
  'isMin': (checker: number, toCheck: any) => false | undefined
  'isPattern': (pattern: string, toCheck: any) => false | undefined
  'isEqualWith': (checker: any, toCheck: any) => false | undefined
}