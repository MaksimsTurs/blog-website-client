import scss from './authorizationModal.module.scss'

import useAuth from '@/custom-hook/use-auth/useAuth'
import useOutsideClick from '@/custom-hook/use-outside-click/useOutsideClick'

import type { User } from '@/global.type'

import FormWrapper from '@/component/form-wrapper/formWrapper'
import TextInput from '@/component/input/text-input/textInput'

import { useRef } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { URL_SEARCH_PARAMS } from '@/conts'

export default function LoginModal() {
  const { handleSubmit, reset, register, formState: { errors }} = useForm<User>({ mode: 'onSubmit' }),
        auth = useAuth(),
        mainContainerRef = useRef<HTMLDivElement>(null),
        isOpen: boolean = useOutsideClick(URL_SEARCH_PARAMS['IS-LOGIN-MODAL-OPEN'], mainContainerRef)

  const login: SubmitHandler<User> = async(user): Promise<void> => {
    await auth.create({ apiURL: '/login', body: user, redirectURL: '/', setToken: true })
    reset()
  }

  auth.clearError()

  return(
    <div ref={mainContainerRef} className={isOpen ? scss.authorization_modal_container : scss.authorization_modal_container_hidden}>
      <FormWrapper errors={auth.error?.message ? [auth.error.message] : []} className={scss.authorization_modal_body} onSubmit={handleSubmit(login)} isPending={auth.isLoading} buttonLabel='Log in'>
        <TextInput<User> 
          register={register} 
          name='name' 
          type='text' 
          errors={errors} 
          validation={{ required: "Name ist erfordelich!", maxLength: { value: 20, message: 'Name ist zu lang!'  }, minLength: { value: 3, message: 'Name ist zu kurz!' }}}
          placeholder='Schreibe deine Name hier'/>
        <TextInput<User> 
          register={register} 
          name='email' 
          type='text' 
          errors={errors} 
          validation={{ required: "Email ist erfordelich!", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email ist nicht korrekt!' }}}
          placeholder='Schreibe dein E-mail hier'/>
        <TextInput<User> 
          register={register} 
          name='password' 
          type='password' 
          errors={errors} 
          validation={{ required: "Kennwort ist erfordelich!", min: { value: 8, message: 'Kennwort ist zu kurz!' }}}
          placeholder='Schreibe deine Kennwort hier'/>
      </FormWrapper>
    </div>
  )
}