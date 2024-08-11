import scss from './postContainer.module.scss'
import '@/scss/global.scss'

import PostHeader from "./component/postHeader";
import PostWrapper from "./component/postWrapper";
import PostTags from './component/postTags';
import ContentViewer from '../content-viewer/contentViewer';

import type { Content } from '@/global.type';
import type { PostCommentsData } from '@/page/post/page.type';
import type { PostContainerProps } from "./postContainer.type";

import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Fragment } from 'react/jsx-runtime';
import { Eye, Heart, MessageCircle } from 'lucide-react';

import DateParser from '@/lib/date-parser/dateParser';

import useAuth from '@/custom-hook/use-auth/useAuth';
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams';
import useHavePermission from '@/custom-hook/use-permitor/useHavePermission';
import useMutate from '@/custom-hook/use-request/useMutate';

import fetcher from '@/lib/fetcher/fetcher';
import coockie from '@/lib/coockie/coockie';

import { URL_SEARCH_PARAMS } from '@/conts';

export default function PostContainer({ post, type }: PostContainerProps) {
  const { id } = useParams()
  const { pathname } = useLocation()
  const redirect = useNavigate()

  const auth = useAuth()
  const searchParams = useSearchParams()
  const permission = useHavePermission()

  const isPostPage: boolean = pathname.search('/post') > -1
  const isHomePage: boolean = pathname === '/'
  const isLiked: boolean = post.likedBy.includes(auth.user?._id || '')
  const isContentCreator: boolean = permission.role(['Creator']).equal('_id', post?.author?._id).permited()
  const isAdmin: boolean = permission.role(['Admin']).permited()
  const isHidden: boolean = post.isHidden

  
  const postID: string = (type === 'preview' || type === 'post') ? post._id : id!
  const currPage: number = (type === 'comment') ? parseInt(searchParams.get('page') || '0') : 0
  const hiddenClass: string = ((isHidden && isAdmin) || (isContentCreator && isHidden)) ? scss.post_hidden : ''
  const key: string = type === 'post' ? `post-${post._id}` : `post-${postID}-comments-${currPage}`

  const { mutate } = useMutate<Content | PostCommentsData>(key)

  if(isHidden && isPostPage && !isAdmin && !isContentCreator && type === 'post') redirect('/')

  const showSomeData = (showThe: string): void => {
    searchParams.set({ [URL_SEARCH_PARAMS['STATISTIC-TO-CHECK']]: showThe, [URL_SEARCH_PARAMS['STATISTIC-PREVIEW-POST-ID']]: post._id, [URL_SEARCH_PARAMS['LIST-PAGE']]: 0 })
  }

  const likeThisPost = async (): Promise<void> => {
    if(post.isHidden && !auth.user) return

    mutate( async (option) => {
      const likedContent = await fetcher.get<Content>(`/${type}/${post._id}/like`, { 'Authorization': `Bearer ${coockie.getOne('PR_TOKEN')}` })

      //Update post
      if(type === 'post') return likedContent

      //Update comment
      const state = option.state as PostCommentsData
      const comments = state.comments || []

      return {...state, comments: comments.map(comment => comment._id === likedContent._id ? likedContent : comment) }
    })
  }

  const createdAtDifference: string = DateParser
    .getDifference(post.createdAt)
    .getSortDate({
       year: '[year] years [month] months ago!',
       month: '[month] months [day] days ago!',
       day: '[day] days [hour] hours ago!',
       hour: '[hour] hours [minute] minutes ago!',
       minute: '[minute] minutes [second] seconds ago!',
       second: '[second] seconds ago!'
    })

  return(
    <Fragment>
      {isHomePage && !isContentCreator && !isAdmin && isHidden ? null :
        <PostWrapper className={hiddenClass}>
          {(type === 'comment' || type === 'preview') ? <PostHeader tags={post.tags || []} title={post.title || ''} content={post.content} isHidden={post.isHidden} postID={postID} contentID={post._id} type={type} createdAt={post.createdAt} user={post?.author}/> : null}
          {type === 'post' ? 
            <div className={scss.post_content_container}>
              <h4 className={scss.post_title}>{post.title}</h4>
              <p className={scss.post_content_date}>{createdAtDifference}</p>
              <ContentViewer content={post.content}/>
            </div> : null}
          {type === 'preview' ? 
            <div className={scss.post_content_container}>
              <Link to={`/post/${post._id}`}>{post.title}</Link>
              <ContentViewer className={scss.post_short_view} content={post.content.slice(0, 450)}/>
            </div> : null}
          {type === 'comment' ? <div className={scss.post_data}><ContentViewer content={post.content}/></div> : null}
            <div className={`${scss.post_tags_statistic_container} flex-row-center-space-between-medium`}>
              {((type === 'post' || type === 'preview') && post.tags) ? <PostTags tags={post.tags}/> : null}
              <div className='flex-row-center-normal-big'>
              {type === 'preview' ? 
                <Fragment>
                  <p className={`${scss.post_statistic_data} flex-row-center-normal-small`} onClick={isHomePage ? () => showSomeData('views') : undefined} ><Eye />{post.viewedBy?.length}</p>
                  <p className={`${scss.post_statistic_data} flex-row-center-normal-small`} onClick={isHomePage ? () => showSomeData('comments') : undefined}><MessageCircle />{post.comments?.length}</p>
                  <p className={`${scss.post_statistic_data} flex-row-center-normal-small`} onClick={isHomePage ? () => showSomeData('likes') : undefined}><Heart />{post.likedBy?.length}</p>
                </Fragment> : null}
              {(type === 'comment' || type === 'post') && auth.user ? <button onClick={likeThisPost} className={`${isLiked ? scss.post_liked : ''} ${scss.post_statistic_data} flex-row-center-normal-small`}><Heart/>{post.likedBy.length}</button> : null}
            </div>
          </div>
        </PostWrapper>}
    </Fragment>
  )
}