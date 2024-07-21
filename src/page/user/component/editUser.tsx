import scss from '../scss/editUser.module.scss'
import '@/scss/global.scss'

import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import { useRef } from 'react';

import useForm from '@/custom-hook/useForm/useForm';
import useHavePermission from '@/custom-hook/use-have-permission/useHavePermission';
import useAuth from '@/custom-hook/useAuth/useAuth';
import useRequest from '@/custom-hook/_use-request/_useRequest';

import FormWrapper from "@/component/form-wrapper/formWrapper";
import TextInput from '@/component/input/textInput/textInput';
import Button from '@/component/button/button';
import FileInput from '@/component/input/fileInput/fileInput';
import MutatingLoader from '@/component/loader/mutatig-loader/mutatingLoader';

import type { EditUserProps } from '../page.type';
import type { User } from '@/global.type';
import type { UserSessionData } from '@/custom-hook/useAuth/useAuth.type';

import createFormDataFromJSON from '@/lib/create-formdata-from-json/createFormDataFromJSON';
import fetcher from '@/lib/fetcher/fetcher';

export default function EditUser({ isVisible, _id, setIsVisible }: EditUserProps) {
  const { submit, reset, formState: { errors } } = useForm<User>([])
  const { mutate, isMutating } = useRequest<UserSessionData>({ deps: [`user-${_id}`] })
  const redirect = useNavigate()
  const auth = useAuth()
  const mainContainerRef = useRef<HTMLDivElement>(null)
  const isAdminOrIDEqual = useHavePermission().isHaveRoleOrIsIDEqual(['Admin'], _id).result()

  const updateUser = (data: User): void => {
    if(isAdminOrIDEqual) {
      mutate({
        key: [`user-${_id}`],
        request: async function(option) {
          const newUserData = await fetcher.post<User>('/update/user', createFormDataFromJSON({...data, _id }))
          auth.create({ setSession: newUserData })
          stopEditing()
          reset()
          return {...option.state, ...newUserData }
        }
      })
    }
  }

  const logOut = (): void => {
    auth.out()
    redirect('/')
  }

  const stopEditing = (): void => {
    setIsVisible(false)
  }

  return(
    <Fragment>
      {isMutating ? <MutatingLoader/> : null}
      <div className={`${isVisible ? scss.edit_user_container_visible : ''} ${scss.edit_user_container} flex-row-center-center-none`}>
        <div ref={mainContainerRef}>
          <FormWrapper onSubmit={submit(updateUser)} className={scss.edit_user_body}>
            <TextInput errors={errors} name='name' placeholder='You name'/>
            <FileInput name="avatar" label='Chose you avatar!' isChange={isMutating}/>
            <div className='flex-row-normal-normal-small'>
              <Button className={scss.edit_user_log_out} onClick={logOut} label='Log out'/>
              <Button onClick={stopEditing} label='Stop editing'/>
              <Button type='submit' label='Save changes'/>
            </div>
          </FormWrapper>
        </div>
      </div>
    </Fragment>
  )
}