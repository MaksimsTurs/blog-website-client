import scss from './authorizationModal.module.scss'

import useAuth from '@/custom-hook/use-auth/useAuth'
import useOutsideClick from '@/custom-hook/use-outside-click/useOutsideClick'

import type { User } from '@/global.type'

import FormWrapper from '@/component/form-wrapper/formWrapper'
import TextInput from '@/component/input/text-input/textInput'
import FileInput from '@/component/input/file-input/fileInput'

import Objects from '@/lib/object/object'
import Strings from '@/lib/string/strings'

import { URL_SEARCH_PARAMS } from '@/conts'

import { useRef } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

export default function RegistrationModal() {
  const { handleSubmit, reset, register, getValues, formState: { errors }} = useForm<User>({ mode: 'onSubmit' }),
        auth = useAuth(),
        mainContainerRef = useRef<HTMLDivElement>(null),
        isOpen: boolean = useOutsideClick(URL_SEARCH_PARAMS['IS-REGISTRATE-MODAL-OPEN'], mainContainerRef)

  const registrate: SubmitHandler<User> = async(data) => {
    const formData = Objects.createFormDataFromJSON(data),
          avatar: File | undefined = (data.avatar as unknown as File[])?.[0]

    if(!avatar) formData.set('avatar', Strings.generateDefaultAvatar(data.name))

    await auth.create({ apiURL: '/registrate', body: formData, redirectURL: '/', setToken: true })
    reset()
  }

  const validatePasswords = (value: any) => {
    return getValues().password === value || 'Deine Kennworts sind nicht gleich!';
  }

  auth.clearError()

  return(
    <div ref={mainContainerRef} className={isOpen ? scss.authorization_modal_container : scss.authorization_modal_container_hidden}>
      <FormWrapper 
        isPending={auth.isLoading} 
        buttonLabel='Anmelden' 
        errors={auth.error?.message ? [auth.error.message] : []} 
        className={scss.authorization_modal_body} 
        onSubmit={handleSubmit(registrate)}>
        <TextInput<User> 
          register={register} 
          name='name' 
          type='text' 
          errors={errors} 
          validation={{ required: "Name ist erfordelich!", maxLength: { value: 20, message: 'Name ist zu lang!'  }, minLength: { value: 3, message: 'Name ist zu kurz!'  }}}
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
          validation={{ required: "Kennword ist erfordelich!", minLength: { value: 8, message: 'Kennwort ist zu kurz!' }}}
          placeholder='Schreibe deine Kennwort hier'/>
        <TextInput 
          register={register} 
          errors={errors} 
          name='confirmPassword' 
          type='password'
          validation={{ required: "Kennwort bestätigung ist erfordelich!", minLength: { value: 8, message: 'Kennwort bestätigung ist zu kurz!' }, validate: validatePasswords }}
          placeholder='Bestätige deine Kennwort hier'/>
        <FileInput 
          register={register}
          name='avatar' 
          type='file' 
          label='Avatar uploaden' 
          reset={auth.isLoading}
          className={scss.authorization_modal_file_input}/>
      </FormWrapper>
    </div>
  )
}