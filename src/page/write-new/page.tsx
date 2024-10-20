import scss from './page.module.scss'

import type { Content, CustomInputsRef } from '@/global.type'
import type { AppDispatch, RootState } from '@/store/store'
import type { PostCommentsData } from '../post/page.type'
import type { CreatorState, ContentDraft } from '@/store/creator/creator.type'
import type { FormFieldsValidation } from '@/custom-hook/use-form/useForm.type'

import FormWrapper from "@/component/form-wrapper/formWrapper"
import TextInput from "@/component/input/text-input/textInput"
import TextArea from '@/component/input/textArea/textArea'
import MutatingLoader from '@/component/loader/mutatig-loader/mutatingLoader'
import TextTagInput from '@/component/input/text-tag-input/textTagInput'
import Button from '@/component/buttons/button/button'
import CheckBoxInput from '@/component/input/checkbox-input/checkBoxInput'
import LocalError from '@/component/errors/local-error/localError'
import WriteNewLoader from './loader'

import { Fragment, useRef } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

import { editOrinsertContentDraft, removeContentDraft } from '@/store/creator/creator'

import useForm from '@/custom-hook/use-form/useForm'
import useAuth from '@/custom-hook/use-auth/useAuth'
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'
import usePermitor from '@/custom-hook/use-permitor/useHavePermission'
import useMutate from '@/custom-hook/use-request/useMutate'

import fetcher from '@/lib/fetcher/fetcher'

import { AUTHORIZATION_OBJECT } from '@/conts'

const USE_FORM_VALIDATION: FormFieldsValidation<Content> = { title: { isMin: { message: 'Title is to short!', value: 4 }}}

export default function WriteNewPost() {
  const dispatch = useDispatch<AppDispatch>(),
        redirect = useNavigate(),
        creator = useSelector<RootState, CreatorState>(state => state.creator),
        postTagsRef = useRef<CustomInputsRef<string[]> | undefined>(),
        postContentRef = useRef<CustomInputsRef<string> | undefined>(),
        searchParams = useSearchParams(),
        auth = useAuth(),
        permitor = usePermitor()
  
  const draftID: string | null = searchParams.get('draft-id')

  if(!permitor.role(['Admin', 'Creator']).permited()) return <Navigate to='/'/>

  const currContent: ContentDraft | undefined = draftID ? creator.contentDraft.find(content => content._id === draftID) : undefined
  
  const { mutate, isMutating, error } = useMutate<PostCommentsData | Content[]>('/10')
  const { submit, reset, register, formState: { errors }} = useForm<Content>(
    USE_FORM_VALIDATION, 
    { title: currContent?.title, isHidden: currContent?.isHidden },
    () => {
      postTagsRef.current?.clear()
      postContentRef.current?.clear()
    }
  )
    
  const createNew = async(data: any): Promise<void> => {
    delete data.alt
    delete data.uploadImg
    delete data.url

    mutate(async function(option) {
      const post = await fetcher.post<Content>(`/insert/post`, {...data, content: postContentRef.current?.value, tags: postTagsRef.current?.value }, AUTHORIZATION_OBJECT)
      const state = option.state as Content[] || []

      redirect(`/post/${post._id}`)
      return [...state || [], post]
    })

    reset()
  }

  const saveDraft = (): void => {
    const newDraftID: string = draftID || window.crypto.randomUUID()
      
    dispatch(editOrinsertContentDraft({...currContent, _id: newDraftID!, content: postContentRef.current?.value || '' }))
      
    searchParams.set({ 'draft-id': newDraftID })
  }

  const deleteDraft = (): void => {
    dispatch(removeContentDraft(draftID!))

    searchParams.remove(['draft-id'])
    reset()
  }

  return(
    <Fragment>
      {isMutating && <MutatingLoader/>}
      {auth.isAuthPending ?
        <WriteNewLoader/> :
        <div className={`${scss.create_new_post_container} flex-row-normal-center-big`}>
          <FormWrapper className={scss.create_new_post_form} onSubmit={submit(createNew)} isPending={false}>
            <TextInput register={register} name='title' errors={errors} placeholder='Post title'/>
            <CheckBoxInput register={register} name='isHidden' label='Hidde post'/>
            <TextTagInput ref={postTagsRef} placeholder='Post tags' value={currContent?.tags}/>
            <TextArea ref={postContentRef} defaultValue={currContent?.content} placeholder='Write content body here...'/>
            <div className={`${scss.create_new_buttons_container} flex-row-center-normal-medium`}>
              <Button type='submit'>Post speichern</Button>
              <Button onClick={saveDraft}>{currContent ? "Entwurf speichern" : 'Als Entwurf speichern'}</Button>
              {draftID && <Button onClick={deleteDraft}>Entwurf löschen</Button>}
            </div>
            {error && <LocalError error={error.message}/>}
          </FormWrapper>
      </div>}
    </Fragment>
  )
}