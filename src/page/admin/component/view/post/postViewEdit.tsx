import scss from './postViewEdit.module.scss'

import type { Content, CustomInputsRef } from "@/global.type";
import type { ContentData, EditViewProps } from '@/page/admin/page.type';

import FormWrapper from "@/component/form-wrapper/formWrapper";
import Button from "@/component/buttons/button/button";
import TextInput from "@/component/input/textInput/textInput";
import CheckBoxInput from "@/component/input/checkbox-input/checkBoxInput";
import TextTagInput from "@/component/input/text-tag-input/textTagInput";
import TextArea from "@/component/input/textArea/textArea";
import MutatingLoader from '@/component/loader/mutatig-loader/mutatingLoader';

import useSearchParams from '@/custom-hook/use-search-params/useSearchParams';
import useMutate from '@/custom-hook/use-request/useMutate';
import useForm from "@/custom-hook/use-form/useForm";

import { Fragment, useRef } from "react";
import { useParams } from 'react-router-dom';

import fetcher from '@/lib/fetcher/fetcher';

import { AUTHORIZATION_OBJECT, URL_SEARCH_PARAMS } from '@/conts';

export default function PostViewEdit({ defaultValue }: EditViewProps<Content>) {
  const postTagsRef = useRef<CustomInputsRef<string>>()
  const postContentRef = useRef<CustomInputsRef<string>>()
  const { tab } = useParams()

  const searchParams = useSearchParams()
  const { submit, register } = useForm<Content>(undefined, { isHidden: defaultValue?.isHidden, title: defaultValue?.title })

  const currPage: number = parseInt(searchParams.get(URL_SEARCH_PARAMS['PAGE']) || '0')
  const id: string | null = searchParams.get('id')

  const { mutate, isMutating } = useMutate<ContentData<Content>>(`admin/${tab}/${currPage}`)

  const editPost = (data: Content): void => {
    mutate(async(option) => {
      const updatedPost: Content = await fetcher.post('/admin/post/update', {...data, id, content: postContentRef.current?.value, tags: postTagsRef.current?.value }, AUTHORIZATION_OBJECT)
      option.removeCache(`post-${updatedPost._id}`)
      return { pagesCount: option.state?.pagesCount || 0, data: option.state!.data.map(item => item._id === updatedPost._id ? updatedPost : item) }
    })
  }

  return(
    <Fragment>
      {isMutating && <MutatingLoader/>}
      <FormWrapper className={scss.post_view_edit_form} onSubmit={submit(editPost)}>
        <TextInput name="title" register={register}/>
        <CheckBoxInput name='isHidden' register={register} label='Hidde post'/>
        <TextTagInput ref={postTagsRef} value={defaultValue?.tags} placeholder='Post tags'/>
        <TextArea ref={postContentRef} defaultValue={defaultValue?.content} placeholder='Write content body here...'/>
        <Button className={scss.post_view_edit_submit_button} type="submit">Änderungen speichern</Button>
      </FormWrapper>
    </Fragment>
  )
}