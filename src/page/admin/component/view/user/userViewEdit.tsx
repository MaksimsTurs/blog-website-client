import scss from './userViewEdit.module.scss'

import type { User } from "@/global.type";
import type { ContentData, EditViewProps } from "@/page/admin/page.type";

import { ShieldHalf, SquarePen, UserRound } from "lucide-react";
import { Fragment } from 'react/jsx-runtime';
import { useParams } from 'react-router-dom';
import { type SubmitHandler, useForm } from 'react-hook-form';

import MutatingLoader from '@/component/loader/mutatig-loader/mutatingLoader';
import TextInput from "@/component/input/text-input/textInput";
import FormWrapper from "@/component/form-wrapper/formWrapper";
import FileInput from "@/component/input/file-input/fileInput";

import useSelect from "@/component/input/select-input/useSelectItem";
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams';
import useMutate from '@/custom-hook/use-request/useMutate';

import { AUTHORIZATION_OBJECT, URL_SEARCH_PARAMS } from '@/conts';

import fetcher from '@/lib/fetcher/fetcher';

export default function UserViewEdit({ defaultValue }: EditViewProps<User>) {
  const { tab } = useParams()
  const { handleSubmit, register, reset } = useForm<User>({ defaultValues: {...defaultValue} }),
        SelectRole = useSelect({}),
        SelectBan = useSelect({}),
        searchParams = useSearchParams()

  const currPage: number = parseInt(searchParams.get(URL_SEARCH_PARAMS['PAGE']) || '0'),
        id: string | null = searchParams.get('id')

  const { mutate, isMutating } = useMutate<ContentData<User>>(`admin/${tab}/${currPage}`)

  const editUser: SubmitHandler<User> = (data): void => {
    mutate(async(option) => {
      const updatedUser: User = await fetcher.post('/admin/user/update', {
        ...data, 
        id, 
        role: SelectRole.selected.at(0), 
        ban: SelectBan.selected.at(0),
      }, AUTHORIZATION_OBJECT)
      return { pagesCount: option.state?.pagesCount || 0, data: option.state?.data.map(item => item._id === updatedUser._id ? {...item, ...updatedUser } : item) || [] }
    })

    reset()
    SelectRole.clear()
    SelectBan.clear()
  }  

  return(
    <Fragment>
      {isMutating && <MutatingLoader/>}
      <FormWrapper buttonLabel='Veränderungen speichern' className={scss.user_view_edit_form} onSubmit={handleSubmit(editUser)}>
        <TextInput type='text' name='name' placeholder='Neue Name schreiben' register={register}/>
        <SelectRole.Wrapper title='User roles:'>
          <SelectRole.Item value='Admin'><div style={{ background: 'transparent' }} className='flex-row-center-normal-big'><ShieldHalf size={15}/><p>Admin</p></div></SelectRole.Item>
          <SelectRole.Item value='Creator'><div style={{ background: 'transparent' }} className='flex-row-center-normal-big'><SquarePen size={15}/><p>Creator</p></div></SelectRole.Item>
          <SelectRole.Item value='User'><div style={{ background: 'transparent' }} className='flex-row-center-normal-big'><UserRound size={15}/><p>User</p></div></SelectRole.Item>
        </SelectRole.Wrapper>
        <SelectBan.Wrapper title='Ban für:'>
          <SelectBan.Item value='1'>1 Day</SelectBan.Item>
          <SelectBan.Item value='7'>7 Days</SelectBan.Item>
          <SelectBan.Item value='14'>14 Days</SelectBan.Item>
        </SelectBan.Wrapper>
        <FileInput register={register} reset={isMutating} name='avatar' type='file' label="Neue Avatar uploaden"/>
      </FormWrapper>
    </Fragment>
  ) 
}