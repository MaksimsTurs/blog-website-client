import { RefObject } from "react"

export default {
  isType: function(name: string, type: 'files' | 'checkbox' | 'number' | 'text' | 'email' | 'password', refs: Map<string, RefObject<HTMLInputElement>>) {
    return refs.get(name)?.current?.type === type
  },
  reset: function(refs: Map<string, RefObject<HTMLInputElement>>) {
    const inputsEntries = refs.entries()

    for(let [_, input] of inputsEntries) {
      input.current!.checked = false
      input.current!.value = ''
    }
  },
  get: {
    checked: function(name: string, refs: Map<string, RefObject<HTMLInputElement>>) {
      return refs.get(name)?.current?.checked
    },
    string: function(name: string, refs: Map<string, RefObject<HTMLInputElement>>) {
      return refs.get(name)?.current?.value
    },
    files: function(name: string, refs: Map<string, RefObject<HTMLInputElement>>) {
      return refs.get(name)?.current?.files
    }, 
    getInputValue: function(name: string, refs: Map<string, RefObject<HTMLInputElement>>) {
      const inputType = refs.get(name)?.current?.type

      switch(inputType) {
        case 'files':
          return this.files(name, refs)
        case 'checkbox':
          return this.checked(name, refs)
        case 'number':
        case 'text':
        case 'email':
        case 'password':
          return this.string(name, refs)
      }
    }
  }
}