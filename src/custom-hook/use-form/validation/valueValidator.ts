import type { ValidationFunctionObject } from "../useForm.type"

let valueValidator: ValidationFunctionObject = {
  isMax: function(checker: number, toCheck: any) {
    if(typeof toCheck === 'string' && checker < toCheck.length) return false 
    return undefined
  },
  isMin: function(checker: number, toCheck: any) {
    if(typeof toCheck === 'string' && checker > toCheck.length) return false 
    return undefined
  },
  isPattern: function(pattern: string, toCheck: string) {
    const regexp = RegExp(pattern.trim())

    if(!regexp.test(toCheck)) return false
    return undefined
  },
  isEqualWith: function(checker: any, toCheck: any) {
    if(typeof checker === 'string' && typeof toCheck === 'string' && checker !== toCheck) return false
    return undefined
  }
}

export default valueValidator