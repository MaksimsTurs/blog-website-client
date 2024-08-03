import scss from '../scss/postHeader.module.scss'
import '@/scss/global.scss'

import { PostHeaderProps } from '../postContainer.type'

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Pencil, Trash2, UserX } from 'lucide-react'

import useHavePermission from '@/custom-hook/use-permitor/useHavePermission'
import useRequest from '@/custom-hook/_use-request/_useRequest'
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'

import DateParser from '@/lib/date-parser/dateParser'
import fetcher from '@/lib/fetcher/fetcher'
import coockie from '@/lib/coockie/coockie'
import firstLetterToUpperCase from '@/lib/first-letter-to-upper/firstLetterToUpper'
import localStorage from '@/lib/local-storage/localStorage'

import type { Content } from '@/global.type'
import type { PostCommentsData } from '@/page/post/page.type'

import ImageComponent from '@/component/image-component/image'

export default function PostHeader({ user, createdAt, type, contentID, postID, content, tags, title, isHidden }: PostHeaderProps) {
  const permission = useHavePermission()
  const searchParams = useSearchParams()
  const redirect = useNavigate()
  const { mutate, changeError } = useRequest({ deps: [] })
  const { pathname } = useLocation()
  
  const isAdminOrCreator: boolean = permission.roleAndEqual(['Admin', 'Creator'], '_id', user?._id).permited()

  const isPostPage: boolean = pathname.search('/post/') > -1
  const isHomePage: boolean = pathname.search('/') > -1
  const isSearchPage: boolean = pathname.search('/search') > -1

  const typeForAPI = type === 'preview' ? 'post' : type
  const page: number = parseInt(searchParams.get('page') || '0')

  const contentAction = (action: 'hidde' | 'show' | 'remove' | 'edit'): void => {
    const key: string[] = 
      isPostPage && type === 'comment' ? 
        [`post-${postID}-comments-${searchParams.get('page') || 0}`] :
      isHomePage ? ['all-posts'] :
        []

    //User have no permmissin
    if(!permission.role(['Creator', 'Admin']).permited()) {
      return changeError(key, { code: 403, message: 'You have no edit and remove permission!' })
    }

    if(action === 'edit') {
      if(permission.role(['Creator']).permited()) {
        localStorage.set(contentID, { content, tags, title, isHidden, contentType: typeForAPI, onPage: page, onPost: postID })
        return redirect(`/write-post?is-edit=true&content-id=${contentID}`)
      } 

      if(permission.role(['Admin']).permited()) {
        return redirect(`/admin/${typeForAPI}?id=${contentID}&${typeForAPI}-edit-modal=true`)
      }
    }

    mutate<Content[] | PostCommentsData>({
      key,
      request: async (option) => {
        //Remove item handlers
        if(action === 'remove') {
          const removedItem = await fetcher.get<Content>(`/admin/remove/${firstLetterToUpperCase(typeForAPI)}/${contentID}`, { 'Authorization': `Bearer ${coockie.getOne('PR_TOKEN')}` })
          
          //Remove some comment from post page
          if(isPostPage && type === 'comment') {
            const state = option.state as PostCommentsData || { comments: [], pagesCount: 0 }

            if(state.comments.length === 1 && state.pagesCount >= 1) {
              for(let index: number = state.pagesCount - 1; index >= 0; index--) if(index !== page) option.removeCache(`post-${postID}-comments-${index}`)
              redirect(`/post/${postID}?page=${+page - 1}`)
              return { pagesCount: 0, comments: [] }            
            }
            return {...state, comments: state.comments!.filter(content => content._id !== removedItem._id) }
          } 
          
          //Remove some post from home page
          if(isHomePage) {
            const state = option.state as Content[] || []
            return state.filter(content => content._id !== removedItem._id)
          }
        }

        //Hidde item handlers
        const hiddenItem = await fetcher.post<Content>(`/admin/${typeForAPI}/update`, { id: contentID, isHidden: action === 'hidde' }, { 'Authorization': `Bearer ${coockie.getOne('PR_TOKEN')}` })
        
        //Hidde some comment from post page
        if(isPostPage) {
          const state = option.state as PostCommentsData || { pagesCount: 0, comments: [] }
          return {...state, comments: state.comments!.map(content => content._id === hiddenItem._id ? {...content, ...hiddenItem } : content) }
        }

        //Hidde post from home page
        const state = option.state as Content[] || []
        return state.map(content => content._id === hiddenItem._id ? hiddenItem : content)
      }
    })
  }

  const createdAtDifference: string = DateParser
    .getDifference(createdAt)
    .getSortDate({
      year: '[year] year [month] months ago!',
      month: '[month] month [day] days ago!',
      day: '[day] day [hour] hours ago!',
      hour: '[hour] hour [minute] minutes ago!',
      minute: '[minute] minutes [second] seconds ago!',
      second: '[second] seconds ago!'
    })

  return(
    <div className={`${scss.post_header} flex-row-center-space-between-none`}>
      {user ? 
      <div className='flex-row-normal-normal-medium'>
         <ImageComponent src={user?.avatar} alt={user?.name || 'User avatar'}/>
         <div className={scss.post_author}>
           <Link to={`/user/${user?._id}`}>{user?.name}</Link>
           <p className={scss.post_create_date}>{createdAtDifference}</p>  
        </div>
      </div> :
      <div className={`${scss.post_header_author_not_defined} flex-row-center-normal-medium`}>
        <UserX/>
        <p>Author is possibly deleted!</p>
      </div>}
      {(isAdminOrCreator && !isSearchPage) ?
      <button className={scss.post_action_button}>
        <svg viewBox="0 0 128 512"><path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/></svg>
        <ul className={`${scss.post_action_container} flex-column-normal-normal-none`}>
          <li onClick={() => contentAction('remove')} className='flex-row-center-normal-medium'><Trash2 /><p>Remove</p></li>
          <li onClick={() => contentAction('edit')} className='flex-row-center-normal-medium'><Pencil /><p>Edit</p></li>
          <li onClick={() => contentAction(isHidden ? 'show' : 'hidde')} className='flex-row-center-normal-medium'>{isHidden ? <Eye /> : <EyeOff />}<p>{isHidden ? 'Show' : 'Hidden'}</p></li>
        </ul>
      </button> : null}
    </div>
  )
}