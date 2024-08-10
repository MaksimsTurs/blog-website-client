import type { FormState, ValidationOptionStringData } from "./useForm.type";
import type { SyntheticEvent } from "react";

import { useRef, useState } from "react";

import formValidator from "./validation/formValidator";
import { KeyValueObject } from "@/global.type";

export default function useForm<T>(validationOptionArray: ValidationOptionStringData<T>[]) {
  const [formState, setFormState] = useState<FormState>({ errors: undefined })

  const targetRef = useRef<HTMLFormElement | null>(null)

  let isValid: boolean = false

  function reset(): void {
    if(!targetRef.current) console.error('Form must be submitted first!')
    if(isValid) {
      const inputs: HTMLCollectionOf<HTMLInputElement> = targetRef.current!.getElementsByTagName('input')

      for(let index: number = 0; index < inputs.length; index++) inputs[index].value = ''
    }
  }

  function setError(name: string, message?: string) {
    setFormState(prev => ({...prev, errors: {...prev.errors, [name]: message }}))
  }

  function submit(target: (data: T) => any): any {
    return new Proxy(target, {
      apply: function(target, _, argArray) {
        const event = argArray[0] as SyntheticEvent<HTMLFormElement>

        let formData: KeyValueObject = {}, validationResult: KeyValueObject, inputs: HTMLInputElement[] = Array.from(event.currentTarget.getElementsByTagName('input'))

        event.preventDefault()

        targetRef.current = event.currentTarget

        for(let index: number = 0; index < inputs.length; index++) {
          const input: HTMLInputElement = inputs[index]

          if(!input.name) continue
          
          if(input.type === 'file') formData[input.name] = input.files
          else if(input.type === 'checkbox') formData[input.name] = input.checked
          else formData[input.name] = input.value
        }

        validationResult = formValidator(validationOptionArray, formData)
        isValid = Object.values(validationResult).filter(maybeResult => maybeResult).length === 0 ? true : false

        setFormState(prev => ({...prev, errors: validationResult }))

        if(isValid) target(formData as T)
      }
    })
  }

  return { submit, reset, setError, formState }
}