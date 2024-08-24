import validator from "./validator"

import type { FormFieldsValidation } from "../useForm.type"
import type { KeyValueObject } from "@/global.type"

export default function formValidator<T>(formData?: KeyValueObject<any>, validation?: FormFieldsValidation<T>) {
  let errorMessages: KeyValueObject = {}

  if(!validation || !formData) return undefined

  const validationEntries = Object.entries(validation)

  for(let [field, validationOptions] of validationEntries) {
    const validationOptionsEntries = Object.entries(validationOptions as any)

    for(let [validationCallbackName, validationData] of validationOptionsEntries) {
      switch(validationCallbackName) {
        case 'isMin':
          const min = validationData as { message?: string, value?: number }
          errorMessages[field] = validator.isMin(min?.message, min?.value, formData[field])
        break
        case 'isMax':
          const max = validationData as { message?: string, value?: number }
          errorMessages[field] = validator.isMax(max?.message, max?.value, formData[field])
        break
        case 'isEqual':
          const equal = validationData as { message?: string, toCompare?: keyof typeof formData }
          errorMessages[field] = validator.isMax(equal?.message, formData[field], formData[equal?.toCompare || ''])
        break
        case 'isPattern':
          const pattern = validationData as { message?: string, value?: RegExp }
          errorMessages[field] = validator.isMax(pattern?.message, formData[field], pattern?.value)
        break
      }
    }
  }

  return errorMessages
}