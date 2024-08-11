import scss from './page.module.scss'

import type { Content, ServerResponseError } from '@/global.type'
import type { AppDispatch, RootState } from '@/store/store'
import type { PostCommentsData } from '../post/page.type'
import type { CreatorState, ContentDraft } from '@/store/creator/creator.type'

import FormWrapper from "@/component/form-wrapper/formWrapper"
import TextInput from "@/component/input/textInput/textInput"
import TextArea from '@/component/input/textArea/textArea'
import MutatingLoader from '@/component/loader/mutatig-loader/mutatingLoader'
import TextTagInput from '@/component/input/text-tag-input/textTagInput'
import Button from '@/component/button/button'
import CheckBoxInput from '@/component/input/checkbox-input/checkBoxInput'
import LocalError from '@/component/error/local-error/localError'
import WriteNewLoader from './loader'

import { Fragment, useRef } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

import { editOrinsertContentDraft, removeContentDraft } from '@/store/creator/creator'

import useForm from '@/custom-hook/useForm/useForm'
import useAuth from '@/custom-hook/useAuth/useAuth'
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'
import usePermitor from '@/custom-hook/use-permitor/useHavePermission'
import useMetadata from '@/custom-hook/use-metadata/useMetadata'
import useMutate from '@/custom-hook/_use-request/useMutate'

import localStorage from '@/lib/local-storage/localStorage'
import fetcher from '@/lib/fetcher/fetcher'
import coockie from '@/lib/coockie/coockie'

//Create content || Update content || Save draft || Update draft || Remove draft
export default function WriteNewPost() {
  const dispatch = useDispatch<AppDispatch>()
  const redirect = useNavigate()
  const creator = useSelector<RootState, CreatorState>(state => state.creator)

  const searchParams = useSearchParams()
  const auth = useAuth()
  const { submit, reset, formState: { errors }} = useForm<Content>([['title', 'isMin:4:Title is to short!']])
  const permitor = usePermitor()
  
  const contentID: string | null = searchParams.get('content-id')
  const draftID: string | null = searchParams.get('draft-id')

  if(!permitor.role(['Admin', 'Creator']).permited()) return <Navigate to='/'/>

  const currContent: ContentDraft | undefined = 
    //Get content to edit
    contentID ? 
    localStorage.get<ContentDraft>(contentID, 'null') :
    //Get content draft to edit
    draftID ?
    creator.contentDraft.find(content => content._id === draftID) :
    undefined

  const isPost: boolean = currContent?.contentType === 'post'

  useMetadata({ 
    title: 
      currContent?.isEdit && currContent ? `${isPost ? currContent.title : 'Comment'} ändern` :
      draftID && currContent ? `${isPost ? currContent.title : 'Entwurf'} ändern` :
      'Neue post schreiben',
    description: 'Hier kannst neue post oder entwurfe schreiben oder ändern.'
  })

  const key: string = currContent?.isFromAdmin ? '' : currContent?.contentType === 'comment' ? `post-${currContent.onPost}-comments-${currContent.onPage}` : 'all-posts'
  
  const { mutate, isMutating, error } = useMutate<PostCommentsData | Content[]>(key)

  const passError: ServerResponseError | undefined = error ? error : currContent?.isEdit && !currContent ? { code: 404, message: 'Content not found!' } : undefined
  
  const tagsRef = useRef<string[]>(currContent?.tags || [])
  const contentRef = useRef<string>('')
  
  const createNew = async(data: any): Promise<void> => {
    delete data.alt
    delete data.uploadImg
    delete data.url

    mutate(async function(option) {
      if(currContent?.isEdit) {
        const updated = await fetcher.post<Content>(`/admin/${currContent?.contentType}/update`, {...data, content: contentRef.current, tags: tagsRef.current, id: draftID || contentID }, { 'Authorization': `Bearer ${coockie.getOne('PR_TOKEN')}` })

        localStorage.remove(updated._id!)

        //Edit post
        if(currContent?.contentType === 'post') {
          const state = option.state as Content[] || []

          option.removeCache(`/post-${updated._id}`)

          for(let index: number = (currContent?.onPage || 0) + 1; index >= 0; index--) {
            option.removeCache(`${currContent.contentType}-${index}`)
          }

          if(!currContent.isFromAdmin) redirect(`/post/${updated._id}`)
          else redirect(`/admin/${currContent.contentType}`)

          return state.map(post => post._id === updated._id ? updated : post)
        }
        
        //Edit comment
        if(currContent?.contentType === 'comment') {
          const state = option.state as PostCommentsData || { pagesCount: 0, comments: [] }

          if(!currContent.isFromAdmin) {
            redirect(`/post/${currContent?.onPost}?page=${currContent?.onPage}`)
            return {...state, comments: state.comments.map(comment => comment._id === updated._id ? updated : comment) }
          }

          redirect('/admin/comment')
          return undefined
        }
      }

      //Insert post
      const post = await fetcher.post<Content>(`/insert/post`, {...data, content: contentRef.current, tags: tagsRef.current }, { 'Authorization': `Bearer ${auth?.user?.token}` })
      const state = option.state as Content[] || []

      redirect(`/post/${post._id}`)
      return [...state || [], post]
    })
  }

  const getTags = (tags: string[]): void => {
    tagsRef.current = tags
  }

  const saveDraft = (): void => {
    const newDraftID: string = draftID || contentID || window.crypto.randomUUID()
      
    dispatch(editOrinsertContentDraft({...currContent, _id: newDraftID!, content: contentRef.current }))
      
    searchParams.set({ 'draft-id': newDraftID })
    searchParams.remove(['content-id'])

    localStorage.remove(contentID!)
  }

  const deleteDraft = (): void => {
    dispatch(removeContentDraft(draftID || contentID!))
    searchParams.remove(['draft-id'])
    reset()
    tagsRef.current = []
    contentRef.current = ''
  }

  const getTextAreaContentValue = (content: string): void => {
    contentRef.current = content
  }

  return(
    <Fragment>
      {isMutating && <MutatingLoader/>}
      {auth.isAuthPending ?
        <WriteNewLoader/> :
        <div className={`${scss.create_new_post_container} flex-row-normal-center-big`}>
          <FormWrapper className={scss.create_new_post_form} onSubmit={submit(createNew)} isPending={false}>
              {currContent?.contentType !== 'comment' ?
              <Fragment>
                <TextInput name='title' errors={errors} defaultValue={currContent?.title} placeholder='Post title'/>
                <CheckBoxInput name='isHidden' label='Hidde post' defaultValue={currContent?.isHidden}/>
                <TextTagInput getTags={getTags} placeholder='Post tags' value={tagsRef.current}/>
              </Fragment> : null}
            <TextArea defaultValue={currContent?.content} placeholder='Write content body here...' getValue={getTextAreaContentValue}/>
            <div className={scss.create_new_buttons_container}>
              <Button label={currContent?.isEdit ? `Edit ${currContent?.contentType}` : `Create post`} type='submit'/>
              <Button label={currContent && !contentID ? "Save draft changes" : 'Save as draft'} onClick={saveDraft}/>
              <Button label="Delete draft" onClick={deleteDraft}/>
            </div>
            {passError && <LocalError error={passError.message}/>}
          </FormWrapper>
      </div>}
    </Fragment>
  )
}