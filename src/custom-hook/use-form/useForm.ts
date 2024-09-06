import type { FormFieldsRegisterReturn, FormFieldsValidation, FormFieldsValues, FormState } from "./useForm.type";
import type { SyntheticEvent } from "react";
import type { KeyValueObject } from "@/global.type";

import { useRef, useState } from "react";

import formValidator from "./tool/formValidator";
import getDefaultValue from "./tool/getDefaultValue";

export default function useForm<T, R = any>(validation?: FormFieldsValidation<T>, defaultValue?: FormFieldsValues<T, R>) {
  let isSubmited = useRef<boolean>(false)
  let isResetButtonPressed = useRef<boolean>(false)
  
  const [formState, setFormState] = useState<FormState>({ errors: undefined })
  const [formValues, setFormValues] = useState<KeyValueObject<any>>((isSubmited.current && isResetButtonPressed.current) ? {} : (defaultValue || {}))
  
  function reset(): void {
    setFormValues({})
    isResetButtonPressed.current = true
  }

  function setError(name: string, message?: string) {
    setFormState(prev => ({...prev, errors: {...prev.errors, [name]: message }}))
  }

  function register(name: string): FormFieldsRegisterReturn {
    const defaultValuePerName: string | boolean | undefined | null = getDefaultValue(name)
    const value: string | boolean = formValues?.[name] || (typeof defaultValuePerName !== 'undefined' ? defaultValuePerName : '')

    if(typeof defaultValuePerName === 'boolean' && typeof formValues?.[name] === 'undefined') {
      setFormValues(prev => ({...prev, [name]: defaultValuePerName }))
    }

    return { 
      name, 
      value: (isSubmited.current && isResetButtonPressed.current) && typeof value === 'object' ? '' : value, 
      checked: isSubmited.current && isResetButtonPressed.current ? false : (value as boolean),
      onChange: (event: any) => {
        setFormValues(prev => {
          const type = event.target.type

          if(type === 'checkbox') return {...prev, [name]: event.target.checked || false }
          if(type === 'file') return {...prev, [name]: Array.from(event.target.files)[0] }
          return {...prev, [name]: event.target.value }
        })
      }
    }
  }

  function submit(target: (data: T) => any): any {
    return new Proxy(target, {
      apply: function(target, _, argArray) {
        isSubmited.current = true
        const event = argArray[0] as SyntheticEvent<HTMLFormElement>

        let validationResult: KeyValueObject | undefined

        event.preventDefault()

        validationResult = formValidator<T>(formValues, validation)
        
        if(!validationResult) return target(formValues as T)

        setFormState(prev => ({...prev, errors: validationResult }))

        if(Object.values(validationResult).filter(Boolean).length === 0) {
          new Promise((resolve) => resolve(target(formValues as T)))
            .finally(() => {
              isResetButtonPressed.current = false
              isSubmited.current = false
            })
        }
      }
    })
  }

  return { submit, reset, setError, register, formState }
}