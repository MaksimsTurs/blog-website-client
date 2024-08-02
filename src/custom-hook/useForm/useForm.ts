import type { FormState, ValidationOptionStringData } from "./useForm.type";
import type { SyntheticEvent } from "react";

import { useRef, useState } from "react";

import formValidator from "./validation/formValidator";

export default function useForm<T>(validationOptionArray: ValidationOptionStringData<T>[]) {
  const [formState, setFormState] = useState<FormState>({ errors: undefined })

  const targetRef = useRef<HTMLFormElement | null>(null)
  const isValid = useRef<boolean>(false)

  function reset(): void {
    if(!targetRef.current) console.error('Form must be submitted first!')
    if(isValid.current) {
      const inputs: HTMLCollectionOf<HTMLInputElement> = targetRef.current!.getElementsByTagName('input')

      for(let index: number = 0; index < inputs.length; index++) inputs[index].value = ''
    }
  }

  function submit(target: (data: T) => any): any {
    return new Proxy(target, {
      apply: function(target, _, argArray) {
        const event = argArray[0] as SyntheticEvent<HTMLFormElement>

        event.preventDefault()

        targetRef.current = event.currentTarget

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