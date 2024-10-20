import scss from './sideMenu.module.scss'
import '@/scss/global.scss'

import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Fragment } from 'react/jsx-runtime'
import { UserPlus } from 'lucide-react'

import useAuth from '@/custom-hook/use-auth/useAuth'
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'

import ImageComponent from '../image-component/image'
import SideMenuLoader from './component/sideMenuLoader'

import type { CreatorState } from '@/store/creator/creator.type'
import type { RootState } from '@/store/store'

import { URL_SEARCH_PARAMS } from '@/conts'

import getIconByPath from './tool/getIconByPath'

const SPECIAL_CHARACTERS: RegExp = /[\#\[\]\{\}\(\)]/g

export default function SideMenu() {
  const { pathname } = useLocation()
  const creator = useSelector<RootState, CreatorState>(state => state.creator)
  
  const searchParams = useSearchParams()
  const auth = useAuth()
  
  const isSideMenuOpen: boolean = JSON.parse(searchParams.get(URL_SEARCH_PARAMS['IS-SIDE-MENU-OPEN']) || 'false')
    
  const openAuthorizationModal = (modal: 'login' | 'registrate'): void => {
    searchParams.set({ [`is-${modal}-modal-open`]: !JSON.parse(searchParams.get(`is-${modal}-modal-open`) || 'false') })
    searchParams.remove([URL_SEARCH_PARAMS['IS-SIDE-MENU-OPEN']])
  }

  return(
    <div className={scss.aside_menu_container}>
      <aside className={`${!isSideMenuOpen ? scss.aside_menu_body : `${scss.aside_menu_container_visible} ${scss.aside_menu_body}`} flex-column-normal-normal-medium`}>
        {auth.user ?
        <div className={`${scss.aside_menu_user_action} flex-column-normal-normal-none`}>
          <p className={scss.aside_menu_title}>User</p>
          <Link to={`/user/${auth.user?._id}`} className={'flex-row-center-normal-medium'}>
            <ImageComponent classNames={{ svg: scss.aside_menu_user_avatar, img: scss.aside_menu_user_avatar }} src={auth.user?.avatar} alt={auth.user?.name || 'User avatar'}/>
            <p>{auth.user?.name}</p>
          </Link>
        </div> :
        <Fragment>
            <button style={{ width: '100%' }} className='flex-row-center-normal-medium' onClick={() => openAuthorizationModal('login')}>
              <UserPlus className={scss.aside_menu_icon}/>
              <p>Login</p>
            </button>
            <button style={{ width: '100%' }} className='flex-row-center-normal-medium' onClick={() => openAuthorizationModal('registrate')}>
              <UserPlus className={scss.aside_menu_icon}/>
              <p>Registrate</p>
            </button>
        </Fragment>}
        <div className='flex-column-normal-normal-none'>
          <p className={scss.aside_menu_title}>Menu</p>
          {auth.isAuthPending ?
          <SideMenuLoader/> :
          <section className='flex-column-normal-normal-small'>
            {auth.permissions?.routing.map(route => (
              <Link className={(pathname.split('/')[1] === route.path.split('/')[1]) ? `${scss.aside_link_active} flex-row-center-normal-medium` : `flex-row-center-normal-medium`} key={route.title} to={route.path}>
                {getIconByPath(route.path, scss.aside_menu_icon)}
                <p className={scss.aside_menu_text_wrapper}>{route.title}</p>
              </Link>
            ))}
          </section>}
        </div>
        {creator.contentDraft.length > 0 &&
        <div className='flex-column-normal-normal-none'>
          <p className={scss.aside_menu_title}>Entwürfe</p>
          <section className='flex-column-normal-normal-small'>
            {creator.contentDraft
              .slice(-5)
              .map(draft => (
                <Link className={scss.aside_menu_text_wrapper} key={draft._id} to={`/write-post?draft-id=${draft._id}`}>
                  {draft.content.replace(SPECIAL_CHARACTERS, '').trim() || draft.title || 'Unknown'}
                </Link>
              ))}
          </section>
        </div>}
      </aside>
    </div>
  )
}