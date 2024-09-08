import isType from "./isType"

export default {
  value: function(value: any, input?: HTMLInputElement | null) {
    if(!input) return ''

    if(isType(input.type, 'checkhox')) input.checked = value
    else input.value = value
  }
}