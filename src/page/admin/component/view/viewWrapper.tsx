import scss from './viewWrapper.module.scss'
import '@/scss/global.scss'

import type { Content, User } from '@/global.type';
import type { ContentData, ViewWrapperProps } from "../../page.type";

import { Fragment, useState } from 'react';
import { ChevronLeft, Pencil, Trash2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom';

import useSearchParams from '@/custom-hook/use-search-params/useSearchParams';
import useMutate from '@/custom-hook/use-request/useMutate';

import MutatingLoader from '@/component/loader/mutatig-loader/mutatingLoader';

import { AUTHORIZATION_OBJECT, URL_SEARCH_PARAMS } from '@/conts';

import fetcher from '@/lib/fetcher/fetcher';
import firstLetterToUpperCase from '@/lib/string/props/firstLetterToUpperCase';

export default function ViewWrapper({ form, children, title }: ViewWrapperProps) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const { tab } = useParams()
  const navigate = useNavigate()

  const searchParams = useSearchParams()

  const currPage: number = parseInt(searchParams.get(URL_SEARCH_PARAMS['PAGE']) || '0')
  const id: string | null = searchParams.get('id')

  const { mutate, isMutating } = useMutate<ContentData<Content | User>>(`admin/${tab}/${currPage}`)

  const removeItem = (): void => {
    mutate(async(option) => {
      const removedItem = await fetcher.get<{ _id: string }>(`/admin/remove/${firstLetterToUpperCase(tab || '')}/${id}`, AUTHORIZATION_OBJECT)
      goBack()
      return { pagesCount: option.state?.pagesCount || 0, data: option.state?.data.filter(data => data._id !== removedItem._id) || [] }
    })
  }

  const changeEditMode = (): void => {
    setIsEditMode(prev => !prev)
  }

  const goBack = (): void => {
    setIsEditMode(false)
    navigate(-1)
  }

  return(
    <Fragment>
      {isMutating && <MutatingLoader/>}
      <div className={`${scss.view_wrapper_body} flex-column-normal-normal-medium`}>
        <div className={scss.view_wrapper_header}>
          <div className={`${scss.view_wrapper_title} flex-column-normal-normal-medium`}>
            <div className='flex-row-normal-normal-small'>
              <ChevronLeft onClick={goBack} className={scss.view_wrapper_action_button}/>
              <Pencil onClick={changeEditMode} className={`${isEditMode ? scss.view_wrapper_action_button_active : ''} ${scss.view_wrapper_action_button}`}/>
              <Trash2 onClick={removeItem} className={scss.view_wrapper_action_button}/>
            </div>
            <p>{`${firstLetterToUpperCase(tab!)}: ${title}`}</p>
          </div>
        </div>
        <div className={`${scss.view_wrapper_child_container} flex-column-normal-normal-medium`}>{isEditMode ? form : children}</div>
      </div>
    </Fragment>
  )
}