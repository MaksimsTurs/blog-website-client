import scss from '../scss/editUser.module.scss'
import '@/scss/global.scss'

import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

import useForm from '@/custom-hook/use-form/useForm';
import useHavePermission from '@/custom-hook/use-permitor/useHavePermission';
import useMutate from '@/custom-hook/use-request/useMutate';
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams';
import useAuth from '@/custom-hook/use-auth/useAuth';
import useRequest from '@/custom-hook/use-request/useRequest';

import FormWrapper from "@/component/form-wrapper/formWrapper";
import TextInput from '@/component/input/textInput/textInput';
import Button from '@/component/buttons/button/button';
import FileInput from '@/component/input/fileInput/fileInput';
import MutatingLoader from '@/component/loader/mutatig-loader/mutatingLoader';
import ModalWrapper from '@/component/modals/modal-wrapper/modalWrapper';

import type { EditUserProps } from '../page.type';
import type { User } from '@/global.type';
import type { UserSessionData } from '@/custom-hook/use-auth/useAuth.type';

import Objects from '@/lib/object/object';
import fetcher from '@/lib/fetcher/fetcher';

import { URL_SEARCH_PARAMS } from '@/conts';

export default function EditUser({ _id }: EditUserProps) {
  const { submit, reset, formState: { errors } } = useForm<User>()
  const { isMutating } = useRequest<UserSessionData>({ deps: [`user-${_id}`] })
  const { mutate } = useMutate<UserSessionData>(`user-${_id}`)
  const auth = useAuth()
  const searchParams = useSearchParams()

  const redirect = useNavigate()
  
  const isAdminOrIDEqual: boolean = useHavePermission().role(['Admin']).equal('_id', _id).permited()

  const updateUser = (data: User): void => {
    if(isAdminOrIDEqual) {
      mutate(async function(option) {
        const newUserData = await fetcher.post<User>('/update/user', Objects.createFormDataFromJSON({...data, _id }))
        
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
      <ModalWrapper title='Edit user' modalKey='IS-EDIT-USER-MODAL-OPEN'>
        <FormWrapper onSubmit={submit(updateUser)} className={scss.edit_user_body}>
          <TextInput errors={errors} name='name' placeholder='You name'/>
          <FileInput name="avatar" label='Chose you avatar!'/>
          <div className={`${scss.edit_user_buttons} flex-row-normal-normal-small`}>
            <Button className={scss.edit_user_log_out} onClick={logOut}>Abmelden</Button>
            <Button type='submit'>Speichern</Button>
          </div>
        </FormWrapper>
      </ModalWrapper>
    </Fragment>
  )
}