import scss from './authorizationModal.module.scss'

import useForm from '@/custom-hook/use-form/useForm'
import useAuth from '@/custom-hook/use-auth/useAuth'
import useOutsideClick from '@/custom-hook/use-outside-click/useOutsideClick'

import type { FormFieldsValidation } from '@/custom-hook/use-form/useForm.type'
import type { User } from '@/global.type'

import FormWrapper from '@/component/form-wrapper/formWrapper'
import TextInput from '@/component/input/textInput/textInput'
import FileInput from '@/component/input/fileInput/fileInput'

import Objects from '@/lib/object/object'
import CharacterArray from '@/lib/string/strings'

import { URL_SEARCH_PARAMS } from '@/conts'

import { useRef } from 'react'

const USE_FORM_VALIDATION: FormFieldsValidation<User> = {
  name: { isMax: { message: "Name is to long!", value: 12 }, isMin: { message: "Name is to short!", value: 3 }},
  email: { isPattern: { message: 'Email is not valid!', value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }},
  password: { isMin: { message: "Password is to short!", value: 8 }, isEqual: { message: 'Passwords does match', compareWith: 'confirmPassword' }},
  confirmPassword: { isMin: { message: 'Confirm password is to short!', value: 8 }, isEqual: { message: 'Passwords does match', compareWith: 'password' }}
}

export default function RegistrationModal() {
  const auth = useAuth()
  const mainContainerRef = useRef<HTMLDivElement>(null)
  const isOpen: boolean = useOutsideClick(URL_SEARCH_PARAMS['IS-REGISTRATE-MODAL-OPEN'], mainContainerRef)
  const { submit, reset, register, formState: { errors }} = useForm<User>(USE_FORM_VALIDATION)

  const registrate = async(data: User) => {
    const formData = Objects.createFormDataFromJSON(data)

    if((formData.get('avatar') as File).size === 0) formData.set('avatar', CharacterArray.generateDefaultAvatar(data.name))
    
    await auth.create({ apiURL: '/registrate', body: formData, redirectURL: '/', setToken: true })
    reset()
  }

  auth.clearError()

  return(
    <div ref={mainContainerRef} className={isOpen ? scss.authorization_modal_container : scss.authorization_modal_container_hidden}>
      <FormWrapper isPending={auth.isLoading} buttonLabel='Registrate' errors={auth.error?.message ? [auth.error.message] : []} className={scss.authorization_modal_body} onSubmit={submit(registrate)}>
        <TextInput register={register} errors={errors} name='name'  placeholder='You name'/>
        <TextInput register={register} errors={errors} name='email' placeholder='You e-mail' type='email'/>
        <TextInput register={register} errors={errors} name='password' placeholder='You password' type='password'/>
        <TextInput register={register} errors={errors} name='confirmPassword' placeholder='Confirm you password' type='password'/>
        <FileInput register={register} name='avatar' label='Chose you avatar!'/>
      </FormWrapper>
    </div>
  )
}