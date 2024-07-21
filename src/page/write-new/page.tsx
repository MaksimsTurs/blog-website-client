import scss from './page.module.scss'

import type { Content } from '@/global.type'
import type { AppDispatch, RootState } from '@/store/store'
import type { PostCommentsData } from '../post/page.type'
import type { CreatorState, ContentDraft } from '@/store/creator/creator.type'

import FormWrapper from "@/component/form-wrapper/formWrapper"
import TextInput from "@/component/input/textInput/textInput"
import TextArea from '@/component/input/textArea/textArea'
import Error from '@/component/error/error'
import MutatingLoader from '@/component/loader/mutatig-loader/mutatingLoader'
import ModalError from '@/component/modal-error/modalError'
import Button from '@/component/button/button'
import WriteNewLoader from './loader'

import { Fragment, useRef } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { editOrinsertContentDraft, removeContentDraft } from '@/store/creator/creator'

import useRequest from '@/custom-hook/_use-request/_useRequest'
import useForm from '@/custom-hook/useForm/useForm'
import useAuth from '@/custom-hook/useAuth/useAuth'
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'
import useHavePermission from '@/custom-hook/use-have-permission/useHavePermission'

import localStorage from '@/lib/local-storage/localStorage'
import fetcher from '@/lib/fetcher/fetcher'
import coockie from '@/lib/coockie/coockie'
import TextTagInput from '@/component/input/text-tag-input/textTagInput'

//Create content || Update content || Save draft || Update draft || Remove draft
export default function WriteNewPost() {
  const dispatch = useDispatch<AppDispatch>()
  const redirect = useNavigate()
  const contentRef = useRef<string>('')
  const creator = useSelector<RootState, CreatorState>(state => state.creator)
  const searchParams = useSearchParams()
  const auth = useAuth()
  const permission = useHavePermission()
  const { submit } = useForm<Content>([])
  
  const contentID: string | null = searchParams.get('content-id')
  const draftID: string | null = searchParams.get('draft-id')
  const isEdit: boolean = JSON.parse(searchParams.get('is-edit') || 'false')
  
  const isAdminOrCreator: boolean = permission.isHaveRole(['Admin', 'Creator']).result()

  const currContent: ContentDraft | undefined = 
    //Get content to edit
    isEdit && contentID ? 
    localStorage.get<ContentDraft>(contentID, 'null') :
    //Get content draft to edit
    draftID ?
    creator.contentDraft.find(content => content._id === draftID) :
    undefined

  const key: string[] = currContent?.contentType === 'comment' ? [`post-${currContent.onPost}-comments-${currContent.onPage}`] : ['all-posts']

  const { mutate, isMutating, error } = useRequest({ deps: key })
  
  const tagsRef = useRef<string[]>(currContent?.tags || [])
  
  const createNew = async(data: any): Promise<void> => {
    delete data.alt
    delete data.uploadImg
    delete data.url


    mutate<PostCommentsData | Content[]>({
      key,
      request: async function(option) {
        if(isEdit) {
          const updated = await fetcher.post<Content>(`/admin/update/${currContent?.contentType}`, {...data, tags: tagsRef.current, id: contentID }, { 'Authorization': `Bearer ${coockie.getOne('PR_TOKEN')}` })

          localStorage.remove(updated._id!)

          //Edit post
          if(currContent?.contentType === 'post') {
            const state = option.state as Content[] || []
  
            option.removeCache(`post-${updated._id}`)
            redirect(`/post/${updated._id}`)
  
            return state.map(post => post._id === updated._id ? updated : post)
          }
          
          //Edit comment
          if(currContent?.contentType === 'comment') {
            const state = option.state as PostCommentsData || { pagesCount: 0, comments: [] }
  
            redirect(`/post/${currContent?.onPost}?page=${currContent?.onPage}`)
            return {...state, comments: state.comments.map(comment => comment._id === updated._id ? updated : comment) }
          }
        }

        //Insert post
        const post = await fetcher.post<Content>(`/insert/post`, {...data, tags: tagsRef.current }, { 'Authorization': `Bearer ${auth?.user?.token}` })
        const state = option.state as Content[] || []

        redirect(`/post/${post._id}`)
        return state.length % 10 === 0 ? state : [...state || [], post]
      }
    })
  }

  const getTags = (tags: string[]): void => {
    tagsRef.current = tags
  }

  const saveDraft = (): void => {
    const newDraftID: string = draftID || contentID || window.crypto.randomUUID()
      
    dispatch(editOrinsertContentDraft({...currContent, content: contentRef.current, _id: newDraftID! }))
      
    searchParams.set({ 'draft-id': newDraftID })
    searchParams.remove(['content-id'])
    localStorage.remove(contentID!)
  }

  const deleteDraft = (): void => {
    dispatch(removeContentDraft(draftID || contentID!))
    searchParams.remove(['draft-id'])
  }

  const getTextAreaContentValue = (content: string): void => {
    contentRef.current = content
  }

  return(
    <Fragment>
      <ModalError error={error}/>
      {isMutating ? <MutatingLoader/> : null}
      {auth.isAuthPending ?
        <WriteNewLoader/> :
        <div className={`${scss.create_new_post_container} flex-row-normal-center-small`}>
          {(currContent || isAdminOrCreator) ?
            <FormWrapper className={scss.create_new_post_form} onSubmit={submit(createNew)} isPending={false}>
              {currContent?.contentType !== 'comment' ?
                <Fragment>
                  <TextInput name='title' defaultValue={currContent?.title} placeholder='Post title'/>
                  <TextTagInput getTags={getTags} placeholder='Post tags' value={tagsRef.current}/>
                </Fragment> : null}
              <TextArea defaultValue={currContent?.content} placeholder='Write content body here...' getValue={getTextAreaContentValue}/>
              <div className={scss.create_new_buttons_container}>
                <Button label={isEdit ? `Edit ${currContent?.contentType}` : `Create post`} type='submit'/>
                <Button label={currContent && !contentID ? "Save draft changes" : 'Save as draft'} onClick={saveDraft}/>
                <Button label="Delete as draft" onClick={deleteDraft}/>
              </div>
            </FormWrapper> : 
            <Error code={404} underText='Content not found or you have not permission!' message='Not found!'/>}
        </div>}
    </Fragment>
  )
}