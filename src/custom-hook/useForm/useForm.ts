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

  function reset() {
    if(!isWasSubmitted) throw new Error('Form must be submitted first!')

    resetRecursive(targetRef.current!.children)
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
        const isValid = Object.values(validationResult).filter(maybeResult => maybeResult).length === 0 ? true : false

        setFormState(prev => ({...prev, errors: validationResult }))

        if(isValid) target(formData as T)
      }
    })
  }

  return { submit, reset, formState }
}