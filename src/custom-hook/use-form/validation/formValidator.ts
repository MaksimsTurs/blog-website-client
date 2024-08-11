import Check from "./valueValidator"

import type { ValidationFunctionObject, ValidationOptionStringData } from "../useForm.type"
import type { KeyValueObject } from "@/global.type"

let errorMessages: KeyValueObject = {}

export default function formValidator<T>(validateStrings: Required<ValidationOptionStringData<T>[]>, formData: any) {
  for(let validationOption in validateStrings) {
    const option = validateStrings[validationOption]

    const fieldName = option[0] as keyof typeof errorMessages
    const validations = option[1]
    
    if(Array.isArray(validations)) {
      const arr: string[] = []
      
      for(let index in validations) {
        if(!validations?.[index]) continue

        const { error, func, value } = getValidationInformation(validations[index])

        if(func === 'isEqualWith') {
          const result = Check[func]((formData[value] as never), formData[fieldName])
          if(result === false) arr.push(error)
    
          errorMessages[fieldName] = arr[0] || arr[arr.length - 1] || undefined
        } else {
          const result = Check[func]((value as never), formData[fieldName])
          if(result === false) arr.push(error)
  
          errorMessages[fieldName] = arr[0] || arr[arr.length - 1] || undefined
        } 
      }
    } else {
      if(!option[1]) return errorMessages
      const field = option[0] as keyof typeof errorMessages
      const { func, value, error } = getValidationInformation(validations!)
      const result = Check[func]((value as never), formData[field])
  
      if(!(func in Check)) throw new ReferenceError(`Object 'Check' have no function with name ${func}`)
      errorMessages[field] = (typeof result === 'undefined') ? undefined : error
    }
  }
  return errorMessages
}

function getValidationInformation(ruleString: string) {
  const [func, value, error] = ruleString.split(':')
  return { func: (func as keyof ValidationFunctionObject), value: (value as never), error }
}