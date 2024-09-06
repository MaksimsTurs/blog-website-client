import scss from './authorizationModal.module.scss'

import useForm from '@/custom-hook/use-form/useForm'
import useAuth from '@/custom-hook/use-auth/useAuth'
import useOutsideClick from '@/custom-hook/use-outside-click/useOutsideClick'

import type { User } from '@/global.type'
import type { FormFieldsValidation } from '@/custom-hook/use-form/useForm.type'

import FormWrapper from '@/component/form-wrapper/formWrapper'
import TextInput from '@/component/input/textInput/textInput'

import { useRef } from 'react'

import { URL_SEARCH_PARAMS } from '@/conts'

const USE_FORM_VALIDATION: FormFieldsValidation<User> = {
  name: { isMax: { message: "Name is to long!", value: 12 }, isMin: { message: "Name is to short!", value: 3 }},
  email: { isPattern: { message: 'Email is not valid!', value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }},
  password: { isMin: { message: "Password is to short!", value: 8 }}
}

export default function LoginModal() {
  const auth = useAuth()
  const mainContainerRef = useRef<HTMLDivElement>(null)
  const isOpen: boolean = useOutsideClick(URL_SEARCH_PARAMS['IS-LOGIN-MODAL-OPEN'], mainContainerRef)

  const { submit, reset, register, formState: { errors }} = useForm<User>(USE_FORM_VALIDATION)

  const login = async(user: User): Promise<void> => {
    await auth.create({ apiURL: '/login', body: user, redirectURL: '/', setToken: true })
    reset()
  }

  auth.clearError()

  return(
    <div ref={mainContainerRef} className={isOpen ? scss.authorization_modal_container : scss.authorization_modal_container_hidden}>
      <FormWrapper errors={auth.error?.message ? [auth.error.message] : []} className={scss.authorization_modal_body} onSubmit={submit(login)} isPending={auth.isLoading} buttonLabel='Log in'>
        <TextInput register={register} name='name' type='text' errors={errors} placeholder='Write you name here...'/>
        <TextInput register={register} name='email' type='text' errors={errors} placeholder='Write you email here...'/>
        <TextInput register={register} name='password' type='password' errors={errors} placeholder='Write you password here...'/>
      </FormWrapper>
    </div>
  )
}