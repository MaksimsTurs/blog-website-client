import scss from '../scss/editUser.module.scss'
import '@/scss/global.scss'

import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import { type SubmitHandler, useForm } from 'react-hook-form';

import useHavePermission from '@/custom-hook/use-permitor/useHavePermission';
import useMutate from '@/custom-hook/use-request/useMutate';
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams';
import useAuth from '@/custom-hook/use-auth/useAuth';

import FormWrapper from "@/component/form-wrapper/formWrapper";
import TextInput from '@/component/input/text-input/textInput';
import Button from '@/component/buttons/button/button';
import FileInput from '@/component/input/file-input/fileInput';
import MutatingLoader from '@/component/loader/mutatig-loader/mutatingLoader';
import ModalWrapper from '@/component/modals/modal-wrapper/modalWrapper';

import type { EditUserProps } from '../page.type';
import type { User } from '@/global.type';

import Objects from '@/lib/object/object';
import fetcher from '@/lib/fetcher/fetcher';

import { URL_SEARCH_PARAMS } from '@/conts';

export default function EditUser({ _id }: EditUserProps) {
  const { handleSubmit, reset, register, formState: { errors } } = useForm<User>()
  const { mutate, isMutating } = useMutate<User>(`user-${_id}`),
        auth = useAuth(),
        searchParams = useSearchParams(),
        redirect = useNavigate()
  
  const isAdminOrIDEqual: boolean = useHavePermission().role(['ADMIN']).equal('_id', _id).permited()

  const updateUser: SubmitHandler<User> = (data): void => {
    if(isAdminOrIDEqual) {
      mutate(async function(option) {
        const newUserData = await fetcher.post<User>('/update/user', Objects.createFormDataFromJSON({...data, _id }))
        
        await auth.create({ setSession: { permissions: auth.permissions!, user: newUserData }})
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
      <ModalWrapper title='Edit user' modalKey='IS-EDIT-USER-MODAL-OPEN'>
        <FormWrapper onSubmit={handleSubmit(updateUser)} className={scss.edit_user_body}>
          <TextInput register={register} name='name' type='text' errors={errors} placeholder='Schreibe deine neue name hier'/>
          <FileInput register={register} name='avatar' type='file' label='Upload deine neue Avatar'/>
          <div className={`${scss.edit_user_buttons} flex-row-normal-normal-small`}>
            <Button className={scss.edit_user_log_out} onClick={logOut}>Abmelden</Button>
            <Button type='submit'>Speichern</Button>
          </div>
        </FormWrapper>
      </ModalWrapper>
    </Fragment>
  )
}