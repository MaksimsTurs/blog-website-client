import scss from './authorizationModal.module.scss'

import useForm from '@/custom-hook/useForm/useForm'
import useAuth from '@/custom-hook/useAuth/useAuth'
import useOutsideClick from '@/custom-hook/use-outside-click/useOutsideClick'

import type { User } from '@/global.type'

import FormWrapper from '../form-wrapper/formWrapper'
import TextInput from '../input/textInput/textInput'
import FileInput from '../input/fileInput/fileInput'

import createFormDataFromJSON from '@/lib/create-formdata-from-json/createFormDataFromJSON'
import generateDefaultAvatar from '@/lib/generate-default-avatar/generateDefaultAvatar'

import { URL_SEARCH_PARAMS } from '@/conts'

import { useRef } from 'react'

export default function RegistrationModal() {
  const mainContainerRef = useRef<HTMLDivElement>(null)
  const isOpen: boolean = useOutsideClick(URL_SEARCH_PARAMS['IS-REGISTRATE-MODAL-OPEN'], mainContainerRef)
  const auth = useAuth()
  const { submit, reset, formState: { errors }} = useForm<User>([
    ['email', 'isPattern:^[^\\s@]+@[^\\s@]+\.[^\\s@]+$:Email is incorrect!'],
    ['name', ['isMax:12:Name is to long!', 'isMin:3:Name is to short!']],
    ['password', ['isMin:8:Password is to short!', 'isEqualWith:confirmPassword:Passwords does match!']],
    ['confirmPassword', ['isMin:8:Password is to short!']]
  ])

  const registrate = (data: User) => {
    const formData = createFormDataFromJSON(data)

    if((formData.get('avatar') as File).size === 0) formData.set('avatar', generateDefaultAvatar(data.name))
    
    auth.create({ apiURL: '/registrate', body: formData, redirectURL: '/', setToken: true })
    reset()
  }

  auth.clearError()

  return(
    <div ref={mainContainerRef} className={isOpen ? scss.authorization_modal_container : scss.authorization_modal_container_hidden}>
      <FormWrapper isPending={auth.isLoading} buttonLabel='Registrate' errors={auth.error?.message ? [auth.error.message] : []} className={scss.authorization_modal_body} onSubmit={submit(registrate)}>
        <TextInput errors={errors} name='name'  placeholder='You name'/>
        <TextInput errors={errors} name='email' placeholder='You e-mail' type='email'/>
        <TextInput errors={errors} name='password' placeholder='You password' type='password'/>
        <TextInput errors={errors} name='confirmPassword' placeholder='Confirm you password' type='password'/>
        <FileInput name='avatar' label='Chose you avatar!'/>
      </FormWrapper>
    </div>
  )
}