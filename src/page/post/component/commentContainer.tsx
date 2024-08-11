import scss from '../scss/commentContainer.module.scss'
import '@/scss/global.scss'

import { Fragment } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';

import type { CommentContainerProps, PostCommentsData } from "../page.type";
import type { Content } from '@/global.type';

import Pagination from "@/component/pagination/pagination";
import Empty from "@/component/empty/empty";
import PostContainer from "@/component/post-container/postContainer";
import FormWrapper from "@/component/form-wrapper/formWrapper";
import TextArea from "@/component/input/textArea/textArea";
import PaginationLoader from '@/component/pagination/component/paginationLoader';
import ModalError from '@/component/modal-error/modalError';
import CommentsLoader from './commentsLoader';
import MutatingLoader from '@/component/loader/mutatig-loader/mutatingLoader';

import useForm from "@/custom-hook/useForm/useForm";
import useAuth from '@/custom-hook/useAuth/useAuth';
import useRequest from '@/custom-hook/_use-request/useRequest';

import fetcher from '@/lib/fetcher/fetcher';

export default function CommentContainer({ page, postID, isPostHidden }: CommentContainerProps) {
  const { submit } = useForm<Pick<Content, 'content'>>([])
  const auth = useAuth()
  const redirect = useNavigate()

  const requestKey = [`post-${postID}-comments-${page}`]

  const { isMutating, isPending, isFetching, error, prev, data, mutate, changeError } = useRequest<PostCommentsData>({
    deps: requestKey,
    prev: [`post-${postID}-comments-${(+page - 1) <= 0 ? 0 : +page - 1}`],
    request: async () => await fetcher.get(`/post/${postID}/comments/${page}`),
  })

  const insertComment = (commentData: any) => {
    delete commentData.alt
    delete commentData.url
    delete commentData.uploadImg

    const increment = (data?.comments || []).length >= 10

    mutate({
      key: requestKey,
      request: async (option) => {
        if((page + 1) < (option.state?.pagesCount || 0)) {
          changeError(option.deps, { code: 500, message: 'You need to be on the latest page to create comment!' })
          return undefined
        }

        const comment = await fetcher.post<Content>('/insert/comment', {...commentData, postID }, { 'Authorization': `Bearer ${auth?.user?.token}` }) 
        
        if(increment) {
          redirect(`/post/${postID}?page=${page + 1}`)
          return { pagesCount: (page || 1) + 1, comments: option.state?.comments || [] }
        } else {
          return { pagesCount: option.state?.pagesCount || 0, comments: [...option.state?.comments || [], comment] }
        }
      }
    })
  } 

  const removeError = (): void => {
    changeError(requestKey)
  }

  return(
    <Fragment>
      <ModalError removeError={removeError} error={error}/>
      {isMutating ? <MutatingLoader/> : null}
      {isFetching ? <PaginationLoader/> : ((prev || data)?.pagesCount || 0) > 0 ? <Pagination disableOn={isPending} pagesCount={(prev || data)!.pagesCount || 0}/> : null}      
      {isFetching ? <CommentsLoader/> :
       data!.comments.length === 0 ? <Empty option={{ flexCenterCenter: true }} label="No comments found!"/> :
       data!.comments.map(comment => <PostContainer key={comment._id} post={comment} type="comment"/>)}
      {isFetching ? <PaginationLoader/> : ((prev || data)?.pagesCount || 0) > 0 ? <Pagination pagesCount={(prev ||data)!.pagesCount || 0}/> : null}      
      {(auth.user && !isPostHidden) ? 
       <div className='flex-row-center-center-none'>
         <FormWrapper onSubmit={submit(insertComment)} isPending={isMutating} className={scss.comment_form_body} buttonLabel='Write comment'>
           <TextArea placeholder='Write your comment here...'/>
         </FormWrapper>
       </div> : null}
    </Fragment>
  )
} 