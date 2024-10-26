import scss from './page.module.scss'
import '@/scss/global.scss'

import { useParams, Navigate } from "react-router-dom"
import { Fragment } from 'react/jsx-runtime'
import { memo } from 'react'

import type { PostCommentsData } from './page.type'
import type { Content } from "@/global.type"

import _PostContainer from "@/component/post-container/postContainer"
import PostContainerLoader from "@/component/loader/post-container-loader/postContainerLoader"
import CommentContainer from "./component/commentContainer"
import PageError from "@/component/errors/page-error/pageError"
import PreviewAuthorData from './component/previewAuthorData'
import PreviewAuthorDataLoader from './component/previewAuthorDataLoader'
import MutatingLoader from '@/component/loader/mutatig-loader/mutatingLoader'
import Pagination from '@/component/pagination/pagination'

import fetcher from "@/lib/fetcher/fetcher"

import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'
import useRequest from '@/custom-hook/use-request/useRequest'
import usePermitor from '@/custom-hook/use-permitor/useHavePermission'

import { AUTHORIZATION_OBJECT, URL_SEARCH_PARAMS } from '@/conts'

const PostContainer = memo(_PostContainer)

export default function Post() {
  const { id } = useParams()
  
  const searchParams = useSearchParams(),
        permission = usePermitor()

  const page: number = parseInt(searchParams.get(URL_SEARCH_PARAMS['PAGE']) || '0')

  const requestKey: string[] = [`post-${id}-comments-${page}`],
        prevKey: string[] = [`post-${id}-comments-${(+page - 1) <= 0 ? 0 : +page - 1}`]

  const post = useRequest<Content>({ deps: [`post-${id}`], request: async () => fetcher.get<Content>(`/post/${id}`, AUTHORIZATION_OBJECT) }),
        comments = useRequest<PostCommentsData>({ deps: requestKey, prev: prevKey, request: async () => await fetcher.get(`/post/${id}/comments/${page}`) }),
        isAdmin: boolean = permission.role(['ADMIN']).permited(),
        isContentCreator: boolean = permission.roleAndEqual(['CREATOR'], '_id', post.data?.author?._id).permited()

  const pagesCount: number = comments.prev?.pagesCount || comments.data?.pagesCount || 0

  if(post.data?.isHidden && (!isAdmin || !isContentCreator) && !post.isFetching) return <Navigate to='/'/>

  return(
    <Fragment>
      {post.isMutating ? <MutatingLoader/> : null}
      {post.error ? <PageError error={post.error}/> :
      <div className={`${scss.post_page_container} flex-row-normal-normal-medium`}>
        <div className={`${scss.post_page_body} flex-column-normal-normal-medium`}> 
          <Fragment>
            {post.isPending ? <PostContainerLoader/> : !post.data ? <PageError error={{ code: 404, message: 'Post not found!' }}/> : <PostContainer post={post.data!} type="post"/>}
            {pagesCount > 2 && <Pagination pagesCount={pagesCount} disableOn/>}
            <CommentContainer comments={comments.data?.comments || []} isPostHidden={post.data?.isHidden || false}/>
            {pagesCount > 2 && <Pagination pagesCount={pagesCount} disableOn/>}
          </Fragment>
        </div>
        {post.isFetching ? <PreviewAuthorDataLoader/> : (post.data && post.data?.author) ? <PreviewAuthorData author={post.data!.author}/> : null}
      </div>}
    </Fragment>
  )
}