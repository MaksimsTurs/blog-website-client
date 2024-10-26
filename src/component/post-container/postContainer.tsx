import scss from './postContainer.module.scss'
import '@/scss/global.scss'

import PostHeader from "./component/postHeader";
import PostWrapper from "./component/postWrapper";
import PostTags from './component/postTags';
import ContentViewer from '../content-viewer/contentViewer';
import PostQuotes from './component/postQuote';

import type { Content } from '@/global.type';
import type { PostCommentsData } from '@/page/post/page.type';
import type { PostContainerProps } from "./postContainer.type";

import { Link, useLocation, useParams } from "react-router-dom";
import { Fragment } from 'react/jsx-runtime';
import { Eye, Heart, MessageCircle, Minus, Plus } from 'lucide-react';

import DateParser from '@/lib/date-parser/dateParser';

import useAuth from '@/custom-hook/use-auth/useAuth';
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams';
import useHavePermission from '@/custom-hook/use-permitor/useHavePermission';
import useMutate from '@/custom-hook/use-request/useMutate';
import useWebsiteSetting from '@/custom-hook/use-website-setting/useWebsiteSetting';

import fetcher from '@/lib/fetcher/fetcher';
import Numbers from '@/lib/number/number';

import { AUTHORIZATION_OBJECT, URL_SEARCH_PARAMS } from '@/conts';

export default function PostContainer({ setToQuote, post, type, isQuoted }: PostContainerProps) {
  const { id } = useParams()
  const { pathname } = useLocation(),
        auth = useAuth(),
        searchParams = useSearchParams(),
        permission = useHavePermission(),
        website = useWebsiteSetting()
  
  const isHomePage: boolean = pathname === '/',
        isLiked: boolean = post.likedBy.includes(auth.user?._id || ''),
        isContentCreator: boolean = permission.role(['CREATOR']).equal('_id', post?.author?._id).permited(),
        isAdmin: boolean = permission.role(['ADMIN']).permited(),
        isHidden: boolean = post.isHidden,
        postID: string = (type === 'preview' || type === 'post') ? post._id : id!,
        currPage: number = (type === 'comment') ? parseInt(searchParams.get('page') || '0') : 0,
        hiddenClass: string = ((isHidden && isAdmin) || (isContentCreator && isHidden)) ? scss.post_hidden : '',
        key: string = type === 'post' ? `post-${post._id}` : `post-${postID}-comments-${currPage}`
  
  const { mutate } = useMutate<Content | PostCommentsData>(key)

  const showSomeData = (showThe: string): void => {
    searchParams.set({ [URL_SEARCH_PARAMS['STATISTIC-TO-PREVIEW']]: showThe, [URL_SEARCH_PARAMS['STATISTIC-PREVIEW-POST-ID']]: post._id, [URL_SEARCH_PARAMS['LIST-PAGE']]: 0 })
  }

  const changeQuotes = (): void => {
    if(setToQuote) {
      setToQuote(prev => {
        if(isQuoted) return prev.filter(quote => quote._id !== post._id)
        return [...prev, post]
      }) 
    }
  }

  const likeThisPost = async (): Promise<void> => {
    if(post.isHidden && !auth.user) return

    mutate( async (option) => {
      const likedContent = await fetcher.get<Content>(`/${type}/${post._id}/like`, AUTHORIZATION_OBJECT)

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
      {isHomePage && (!isContentCreator || !isAdmin) && isHidden ? null :
        <PostWrapper className={hiddenClass}>
          {(type === 'comment' || type === 'preview') && <PostHeader tags={post.tags || []} title={post.title || ''} content={post.content} isHidden={post.isHidden} postID={postID} contentID={post._id} type={type} createdAt={post.createdAt} user={post?.author}/>}
          {type === 'post' &&
            <div className={scss.post_content_container}>
              <h4 style={{ fontFamily: website.setting.postFont }} className={scss.post_title}>{post.title}</h4>
              <p className={scss.post_content_date}>{createdAtDifference}</p>
              <ContentViewer content={post.content}/>
            </div>}
          {type === 'preview' && 
            <div className={scss.post_content_container}>
              <Link style={{ fontFamily: website.setting.postFont }} to={`/post/${post._id}`}>{post.title}</Link>
              <ContentViewer content={`${post.content.slice(0, 250)}...`}/>
            </div>}
          {type === 'comment' && 
            <div className={scss.post_data}>
              <ContentViewer content={post.content}/>
              {(post.quotes?.length !== 0 && post.quotes) && post.quotes.map(quote => <PostQuotes key={quote._id} content={quote}/>)}
            </div>}
            <div className={`${scss.post_tags_statistic_container} flex-row-center-space-between-medium`}>
              {((type === 'post' || type === 'preview') && post.tags) && <PostTags tags={post.tags}/>}
              <div className='flex-row-center-normal-big'>
              {type === 'preview' &&
                <Fragment>
                  <p className={`${scss.post_statistic_data} flex-row-center-normal-small`} onClick={isHomePage ? () => showSomeData('views') : undefined} ><Eye />{Numbers.shortNum(post.viewedBy!.length)}</p>
                  <p className={`${scss.post_statistic_data} flex-row-center-normal-small`} onClick={isHomePage ? () => showSomeData('comments') : undefined}><MessageCircle />{Numbers.shortNum(post.comments!.length)}</p>
                  <p className={`${scss.post_statistic_data} flex-row-center-normal-small`} onClick={isHomePage ? () => showSomeData('likes') : undefined}><Heart />{Numbers.shortNum(post.likedBy.length)}</p>
                </Fragment>}
              {type === 'comment' && <button onClick={changeQuotes} className={`${scss.post_quote_button} ${isQuoted && scss.post_quote_button_selected} flex-row-center-center-none`}>{isQuoted ? <Minus/> : <Plus/>}</button>}
              {(type === 'comment' || type === 'post') && auth.user ? <button onClick={likeThisPost} className={`${isLiked ? scss.post_liked : ''} ${scss.post_statistic_data} flex-row-center-normal-small`}><Heart/>{Numbers.shortNum(post.likedBy.length)}</button> : null}
            </div>
          </div>
        </PostWrapper>}
    </Fragment>
  )
}