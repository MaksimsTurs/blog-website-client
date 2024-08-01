import scss from '../scss/editUser.module.scss'
import '@/scss/global.scss'

import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import { UserCog, X } from 'lucide-react';
import { useRef } from 'react';

import useForm from '@/custom-hook/useForm/useForm';
import useHavePermission from '@/custom-hook/use-permitor/useHavePermission';
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams';
import useAuth from '@/custom-hook/useAuth/useAuth';
import useRequest from '@/custom-hook/_use-request/_useRequest';
import useOutsideClick from '@/custom-hook/use-outside-click/useOutsideClick';

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

import { MODALS_KEYS } from '@/conts';

export default function EditUser({ _id }: EditUserProps) {
  const { submit, reset, formState: { errors } } = useForm<User>([])
  const { mutate, isMutating } = useRequest<UserSessionData>({ deps: [`user-${_id}`] })
  const redirect = useNavigate()
  const auth = useAuth()
  const searchParams = useSearchParams()
  const modalContainerRef = useRef<HTMLDivElement>(null)
  
  const isOpen: boolean = useOutsideClick(MODALS_KEYS['IS-EDIT-USER-MODAL-OPEN'], modalContainerRef)
  const isAdminOrIDEqual: boolean = useHavePermission().role(['Admin']).equal('_id', _id).permited()

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
    searchParams.remove([MODALS_KEYS['IS-EDIT-USER-MODAL-OPEN']])
  }

  return(
    <Fragment>
      {isMutating ? <MutatingLoader/> : null}
      <div ref={modalContainerRef} className={`${isOpen ? scss.edit_user_container_visible : ''} ${scss.edit_user_container} flex-row-center-center-none`}>
        <FormWrapper onSubmit={submit(updateUser)} className={scss.edit_user_body}>
          <section className={`${scss.edit_user_header} flex-row-center-space-between-none`}>
            <div className={`${scss.edit_user_icon} flex-row-center-center-medium`}>
              <UserCog />
              <p>Edit user</p>
            </div>
            <X onClick={stopEditing}/>
          </section>
          <TextInput errors={errors} name='name' placeholder='You name'/>
          <FileInput name="avatar" label='Chose you avatar!' isChange={isMutating}/>
          <div className='flex-row-normal-normal-small'>
            <Button className={scss.edit_user_log_out} onClick={logOut} label='Log out'/>
            <Button type='submit' label='Save changes'/>
          </div>
        </FormWrapper>
      </div>
    </Fragment>
  )
}