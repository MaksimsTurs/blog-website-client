import scss from '../scss/postHeader.module.scss'
import '@/scss/global.scss'

import { PostHeaderProps } from '../postContainer.type'

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Pencil, Trash2, UserX } from 'lucide-react'
import { Fragment } from 'react/jsx-runtime'

import useMutate from '@/custom-hook/use-request/useMutate'
import useHavePermission from '@/custom-hook/use-permitor/useHavePermission'
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'

import DateParser from '@/lib/date-parser/dateParser'
import CharacterArray from '@/lib/string/strings'
import fetcher from '@/lib/fetcher/fetcher'
import localStorage from '@/lib/local-storage/localStorage'

import type { Content } from '@/global.type'
import type { PostCommentsData } from '@/page/post/page.type'

import ImageComponent from '@/component/image-component/image'
import ConfirmModal from '@/component/modals/confirm-modal/confirmModal'

import { AUTHORIZATION_OBJECT, URL_SEARCH_PARAMS } from '@/conts'

export default function PostHeader({ user, createdAt, type, contentID, postID, content, tags, title, isHidden }: PostHeaderProps) {
  const { pathname } = useLocation(),
        permission = useHavePermission(),
        searchParams = useSearchParams(),
        redirect = useNavigate()
  
  const isAdminOrCreator: boolean = permission.roleAndEqual(['ADMIN', 'CREATOR'], '_id', user?._id).permited()

  const isPostPage: boolean = pathname.search('/post/') > -1
  const isHomePage: boolean = pathname.search('/') > -1
  const isSearchPage: boolean = pathname.search('/search') > -1

  const typeForAPI = type === 'preview' ? 'post' : type
  const page: number = parseInt(searchParams.get('page') || '0')
  const key: string = isPostPage && type === 'comment' ? `post-${postID}-comments-${searchParams.get('page') || 0}` : isHomePage ? 'all-posts' : ''

  const { mutate, changeError } = useMutate<Content[] | PostCommentsData>(key)

  const openConfirmModal = (): void => {
    searchParams.set({ [URL_SEARCH_PARAMS['IS-CONFIRM-MODAL-OPEN']]: true })
  }

  const removePost = (): void => {
    contentAction('remove')
  }

  const contentAction = (action: 'hidde' | 'show' | 'remove' | 'edit'): void => {
    //User have no permmissin
    if(!isAdminOrCreator) {
      return changeError({ code: 403, message: 'You have no edit and remove permission!' })
    }

    if(action === 'edit') {
      if(permission.role(['CREATOR']).permited()) {
        localStorage.set(contentID, { content, tags, title, isHidden, isEdit: true, contentType: typeForAPI, onPage: page, onPost: postID })
        return redirect(`/write-post?content-id=${contentID}`)
      } 

      if(permission.role(['ADMIN']).permited()) {
        return redirect(`/admin/${typeForAPI}?id=${contentID}&${typeForAPI}-edit-modal=true`)
      }
    }

    mutate(async (option) => {
      //Remove item handlers
      if(action === 'remove') {
        const removedItem = await fetcher.get<Content>(`/admin/remove/${CharacterArray.firstLetterToUpperCase(typeForAPI)}/${contentID}`, AUTHORIZATION_OBJECT)
        
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
      const hiddenItem = await fetcher.post<Content>(`/admin/${typeForAPI}/update`, { id: contentID, isHidden: action === 'hidde', flag: action }, AUTHORIZATION_OBJECT)
      
      //Hidde some comment from post page
      if(isPostPage) {
        const state = option.state as PostCommentsData || { pagesCount: 0, comments: [] }
        return {...state, comments: state.comments!.map(content => content._id === hiddenItem._id ? {...content, ...hiddenItem } : content) }
      }

      //Hidde post from home page
      const state = option.state as Content[] || []
      return state.map(content => content._id === hiddenItem._id ? hiddenItem : content)
    })
  }

  const createdAtDifference: string = DateParser
    .getDifference(createdAt)
    .getSortDate({
       year: '[year] jahr [month] monaten!',
       month: '[month] monaten [day] tagen!',
       day: '[day] tagen [hour] stunden!',
       hour: '[hour] stunden [minute] minuten!',
       minute: '[minute] minuten [second] sekunden!',
       second: '[second] sekunden!'
    })

  return(
    <Fragment>
      <ConfirmModal title='Post löschen' text='Möchtest du diese Post tatsächlich löschen?' onConfirm={removePost}/>
      <div className={`${scss.post_header} flex-row-center-space-between-none`}>
        {user ? 
        <div className='flex-row-center-normal-medium'>
          <ImageComponent styles={{ svg: { width: '2rem', height: '2rem' }, img: { width: '2rem', height: '2rem' }}} src={user?.avatar} alt={user?.name || 'User avatar'}/>
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
            <li onClick={openConfirmModal} className='flex-row-center-normal-medium'><Trash2/><p>Remove</p></li>
            <li onClick={() => contentAction('edit')} className='flex-row-center-normal-medium'><Pencil/><p>Edit</p></li>
            <li onClick={() => contentAction(isHidden ? 'show' : 'hidde')} className='flex-row-center-normal-medium'>{isHidden ? <Eye/> : <EyeOff/>}<p>{isHidden ? 'Show' : 'Hidden'}</p></li>
          </ul>
        </button> : null}
      </div>
    </Fragment>
  )
}