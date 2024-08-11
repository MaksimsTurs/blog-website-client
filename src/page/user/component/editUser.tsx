import scss from '../scss/editUser.module.scss'
import '@/scss/global.scss'

import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import { UserCog, X } from 'lucide-react';
import { useRef } from 'react';

import useForm from '@/custom-hook/use-form/useForm';
import useHavePermission from '@/custom-hook/use-permitor/useHavePermission';
import useMutate from '@/custom-hook/use-request/useMutate';
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams';
import useAuth from '@/custom-hook/use-auth/useAuth';
import useRequest from '@/custom-hook/use-request/useRequest';
import useOutsideClick from '@/custom-hook/use-outside-click/useOutsideClick';

import FormWrapper from "@/component/form-wrapper/formWrapper";
import TextInput from '@/component/input/textInput/textInput';
import Button from '@/component/button/button';
import FileInput from '@/component/input/fileInput/fileInput';
import MutatingLoader from '@/component/loader/mutatig-loader/mutatingLoader';

import type { EditUserProps } from '../page.type';
import type { User } from '@/global.type';
import type { UserSessionData } from '@/custom-hook/use-auth/useAuth.type';

import Thing from '@/lib/object/object';
import fetcher from '@/lib/fetcher/fetcher';

import { URL_SEARCH_PARAMS } from '@/conts';

export default function EditUser({ _id }: EditUserProps) {
  const { submit, reset, formState: { errors } } = useForm<User>([])
  const { isMutating } = useRequest<UserSessionData>({ deps: [`user-${_id}`] })
  const { mutate } = useMutate<UserSessionData>(`user-${_id}`)
  const auth = useAuth()
  const searchParams = useSearchParams()

  const redirect = useNavigate()
  
  const modalContainerRef = useRef<HTMLDivElement>(null)
  
  const isOpen: boolean = useOutsideClick(URL_SEARCH_PARAMS['IS-EDIT-USER-MODAL-OPEN'], modalContainerRef)
  const isAdminOrIDEqual: boolean = useHavePermission().role(['Admin']).equal('_id', _id).permited()

  const updateUser = (data: User): void => {
    if(isAdminOrIDEqual) {
      mutate(async function(option) {
        const newUserData = await fetcher.post<User>('/update/user', Thing.createFormDataFromJSON({...data, _id }))
        
        auth.create({ setSession: newUserData })
        stopEditing()
        reset()
        return {...option.state, ...newUserData }
      })
    }
  }

  const logOut = (): void => {
    auth.out()
    redirect('/')
  }

  const stopEditing = (): void => {
    searchParams.remove([URL_SEARCH_PARAMS['IS-EDIT-USER-MODAL-OPEN']])
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