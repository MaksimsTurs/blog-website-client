import type { FormFieldsValidationObject } from "../useForm.type"

export default {
  isMax: function(message, value, toCheck) {
    if(!message || !value || !toCheck) return message

    if(toCheck > value) return message
  },
  isMin: function(message, value, toCheck) {
    if(!message || !value || !toCheck) return message

    if(toCheck < value) return message
  },
  isPattern: function(message, value, pattern) {
    if(!message || !value || !pattern) return message
    if(!pattern.test(value)) return message
  },
  isEqual: function(message, value, toCompare) {
    if(value !== toCompare) return message
  }
} as FormFieldsValidationObject