import type { FormState, ValidationOptionStringData } from "./useForm.type";
import type { SyntheticEvent } from "react";

import { useRef, useState } from "react";

import formValidator from "./validation/formValidator";

function resetRecursive(collection: HTMLCollection) {
  for(let index: number = 0; index < collection.length; index++) {
    const child = collection[index]
    if(child.children.length > 0) return resetRecursive(child.children)
    
    const _maybeInput = child as HTMLInputElement

    if(_maybeInput.type) _maybeInput.value = ''
  }
}

export default function useForm<T>(validationOptionArray: ValidationOptionStringData<T>[]) {
  const [formState, setFormState] = useState<FormState>({ errors: undefined })

  const targetRef = useRef<HTMLFormElement | null>(null)
  const isWasSubmitted = useRef<boolean>(false)
  const isValid = useRef<boolean>(false)

  function reset() {
    if(!isWasSubmitted) console.error('Form must be submitted first!')
    if(isValid.current) resetRecursive(targetRef.current!.children)
  }

  function submit(target: (data: T) => any): any {
    return new Proxy(target, {
      apply: function(target, _, argArray) {
        const event = argArray[0] as SyntheticEvent<HTMLFormElement>

        event.preventDefault()

        targetRef.current = event.currentTarget
        isWasSubmitted.current = true

        const formData = Object.fromEntries(new FormData(event.currentTarget).entries())

        const validationResult = formValidator(validationOptionArray, formData)
        isValid.current = Object.values(validationResult).filter(maybeResult => maybeResult).length === 0 ? true : false

        setFormState(prev => ({...prev, errors: validationResult }))

        if(isValid.current) target(formData as T)
      }
    })
  }

  return { submit, reset, formState }
}