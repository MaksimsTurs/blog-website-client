import scss from '../scss/commentContainer.module.scss'
import '@/scss/global.scss'

import { Fragment } from "react/jsx-runtime";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useRef, useState } from 'react';

import type { CommentContainerProps, PostCommentsData } from "../page.type";
import type { Content, CustomInputsRef } from '@/global.type';

import Empty from "@/component/empty/empty";
import PostContainer from "@/component/post-container/postContainer";
import TextArea from "@/component/input/textArea/textArea";
import MutatingLoader from '@/component/loader/mutatig-loader/mutatingLoader';
import Button from '@/component/buttons/button/button';

import useMutate from '@/custom-hook/use-request/useMutate';
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams';
import usePermitor from '@/custom-hook/use-permitor/useHavePermission';
import useAuth from '@/custom-hook/use-auth/useAuth';

import { AUTHORIZATION_OBJECT, URL_SEARCH_PARAMS } from '@/conts';

import fetcher from '@/lib/fetcher/fetcher';
import Arrays from '@/lib/array/array';

export default function CommentContainer({ isPostHidden, comments }: CommentContainerProps) {
  const { id } = useParams(),
        redirect = useNavigate(),
        textAreaRef = useRef<CustomInputsRef<string>>(),
        [quotes, setToQuotes] = useState<Content[]>([]),
        searchParams = useSearchParams(),
        isAdmin = usePermitor().role(['Admin']).permited(),
        auth = useAuth()

  if(isPostHidden && !isAdmin) return <Navigate to='/'/>

  const page: number = parseInt(searchParams.get(URL_SEARCH_PARAMS['PAGE']) || '0')

  const { isMutating, mutate, changeError } = useMutate<PostCommentsData>(`post-${id}-comments-${page}`)

  const insertComment = () => {
    const increment: boolean = (comments || []).length >= 10

    mutate(async (option) => {
      if((page + 1) < (option.state?.pagesCount || 0)) {
        changeError({ code: 500, message: 'Du muss auf letzte seite sein um Kommentar zu hinzufügen!' })
        return undefined
      }

      const comment = await fetcher.post<Content>('/insert/comment', { postID: id, content: textAreaRef.current?.value, quotes }, AUTHORIZATION_OBJECT) 
      
      if(increment) {
        redirect(`/post/${id}?page=${page + 1}`)
        return { pagesCount: (page || 1) + 1, comments: option.state?.comments || [] }
      } else return { pagesCount: option.state?.pagesCount || 0, comments: [...option.state?.comments || [], comment] }
    })

    textAreaRef.current?.clear()
    setToQuotes([])
  } 

  return(
    <Fragment>
      {isMutating ? <MutatingLoader/> : null}
      {comments!.length === 0 ? <Empty option={{ flexCenterCenter: true }} label="Keinen Kommentar wurde gefunden!"/> :
       comments!.map(comment => 
        <PostContainer 
          type="comment"
          key={comment._id} 
          post={comment} 
          setToQuote={setToQuotes} 
          isQuoted={Arrays.includeObjectByKey(quotes, '_id', comment._id)}/>
      )}
      {auth.user &&
      <Fragment>
        <TextArea placeholder='Schreib dein Kommentar hier' ref={textAreaRef}/>
        <Button className={scss.comment_submit_button} onClick={insertComment}>Senden</Button>
      </Fragment>}
    </Fragment>
  )
} 