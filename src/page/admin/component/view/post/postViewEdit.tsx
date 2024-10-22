import scss from './postViewEdit.module.scss'

import type { Content, CustomInputsRef } from "@/global.type";
import type { ContentData, EditViewProps } from '@/page/admin/page.type';

import FormWrapper from "@/component/form-wrapper/formWrapper";
import TextInput from "@/component/input/text-input/textInput";
import CheckBoxInput from "@/component/input/checkbox-input/checkBoxInput";
import TextTagInput from "@/component/input/text-tag-input/textTagInput";
import TextArea from "@/component/input/textArea/textArea";
import MutatingLoader from '@/component/loader/mutatig-loader/mutatingLoader';

import useSearchParams from '@/custom-hook/use-search-params/useSearchParams';
import useMutate from '@/custom-hook/use-request/useMutate';

import { Fragment, useRef } from "react";
import { useParams } from 'react-router-dom';
import { type SubmitHandler, useForm } from 'react-hook-form';

import fetcher from '@/lib/fetcher/fetcher';

import { AUTHORIZATION_OBJECT, URL_SEARCH_PARAMS } from '@/conts';

export default function PostViewEdit({ defaultValue }: EditViewProps<Content>) {
  const { tab } = useParams()
  const { handleSubmit, register, reset } = useForm<Content>({ defaultValues: defaultValue }),
        postTagsRef = useRef<CustomInputsRef<string>>(),
        postContentRef = useRef<CustomInputsRef<string>>(),
        searchParams = useSearchParams()

  const currPage: number = parseInt(searchParams.get(URL_SEARCH_PARAMS['PAGE']) || '0'),
        id: string | null = searchParams.get('id')

  const { mutate, isMutating } = useMutate<ContentData<Content>>(`admin/${tab}/${currPage}`)

  const editPost: SubmitHandler<Content> = (data): void => {
    mutate(async(option) => {
      const updatedPost: Content = await fetcher.post('/admin/post/update', {...data, id, content: postContentRef.current?.value, tags: postTagsRef.current?.value }, AUTHORIZATION_OBJECT)
      option.removeCache(`post-${updatedPost._id}`)
      return { pagesCount: option.state?.pagesCount || 0, data: option.state!.data.map(item => item._id === updatedPost._id ? updatedPost : item) }
    })

    reset()
  }

  return(
    <Fragment>
      {isMutating && <MutatingLoader/>}
      <FormWrapper className={scss.post_view_edit_form} onSubmit={handleSubmit(editPost)} buttonLabel='Änderungen speichern'>
        <TextInput register={register} name='title' type='text' placeholder='Title von der Post'/>
        <CheckBoxInput register={register} name='isHidden' type='checkbox' label='Post ausblenden'/>
        <TextTagInput ref={postTagsRef} value={defaultValue?.tags} placeholder='Post tags'/>
        <TextArea ref={postContentRef} defaultValue={defaultValue?.content} placeholder='Schreib content von dem Post hier'/>
      </FormWrapper>
    </Fragment>
  )
}