import scss from './commentViewEdit.module.scss'

import FormWrapper from "@/component/form-wrapper/formWrapper";
import CheckBoxInput from "@/component/input/checkbox-input/checkBoxInput";
import MutatingLoader from '@/component/loader/mutatig-loader/mutatingLoader';
import TextArea from "@/component/input/textArea/textArea";

import useMutate from '@/custom-hook/use-request/useMutate';
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams';

import { Fragment, useRef } from "react";
import { useParams } from 'react-router-dom';
import { type SubmitHandler, useForm } from 'react-hook-form';

import type { Content, CustomInputsRef } from "@/global.type";
import type { ContentData, EditViewProps } from "@/page/admin/page.type";

import fetcher from '@/lib/fetcher/fetcher';

import { AUTHORIZATION_OBJECT, URL_SEARCH_PARAMS } from '@/conts';

export default function CommentViewEdit({ defaultValue }: EditViewProps<Content>) {
  const { tab } = useParams()
  const { handleSubmit, register, reset } = useForm<Content>(),
        contentRef = useRef<CustomInputsRef<string>>(),
        searchParams = useSearchParams()

  const currPage: number = parseInt(searchParams.get(URL_SEARCH_PARAMS['PAGE']) || '0'),
        id: string | null = searchParams.get('id')

  const { mutate, isMutating } = useMutate<ContentData<Content>>(`admin/${tab}/${currPage}`)

  const editComment: SubmitHandler<Content> = (data): void => {
    mutate(async(option) => {
      const updatedComment: Content = await fetcher.post('/admin/comment/update', {...data, id, content: contentRef.current?.value }, AUTHORIZATION_OBJECT)
      return { pagesCount: option.state?.pagesCount || 0, data: option.state?.data.map(item => item._id === updatedComment._id ? updatedComment : item) || [] }
    })
    
    reset()
  }

  return(
    <Fragment>
      {isMutating && <MutatingLoader/>}
      <FormWrapper buttonLabel='Änderungen speichern' className={scss.comment_view_edit_form} onSubmit={handleSubmit(editComment)}>
        <CheckBoxInput register={register} name="isHidden" type='checkbox' label="Hidde comment"/>
        <TextArea ref={contentRef} defaultValue={defaultValue?.content} placeholder="Comment content"/>
      </FormWrapper>
    </Fragment>
  )
}