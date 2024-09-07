import scss from './sideMenu.module.scss'
import '@/scss/global.scss'

import { Link, useLocation } from 'react-router-dom'
import { CircleHelp, Home, Images, LibraryBig, Search, Settings, Shield, SquarePen, UserPlus } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Fragment } from 'react/jsx-runtime'

import useAuth from '@/custom-hook/use-auth/useAuth'
import usePermitor from '@/custom-hook/use-permitor/useHavePermission'
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'

import ImageComponent from '../image-component/image'
import SideMenuLoader from './component/sideMenuLoader'

import type { CreatorState } from '@/store/creator/creator.type'
import type { RootState } from '@/store/store'

import { URL_SEARCH_PARAMS } from '@/conts'

const adminPaths = [
  { title: 'Admin', path: '/admin/post', icon: <Shield className={scss.aside_menu_icon}/> },
  { title: 'Write post', path: '/write-post', icon: <SquarePen className={scss.aside_menu_icon}/> },
]

const creatorPaths = [
  { title: 'Write post', path: '/write-post', icon: <SquarePen className={scss.aside_menu_icon}/> }
]

const SPECIAL_CHARACTERS: RegExp = /[\#\[\]\{\}\(\)]/g

export default function SideMenu() {
  const { pathname } = useLocation()
  const creator = useSelector<RootState, CreatorState>(state => state.creator)
  
  const searchParams = useSearchParams()
  const auth = useAuth()
  const permission = usePermitor()
  
  const isSideMenuOpen: boolean = JSON.parse(searchParams.get(URL_SEARCH_PARAMS['IS-SIDE-MENU-OPEN']) || 'false')
  
  const paths = [
    { title: 'Home', path: '/', icon: <Home className={scss.aside_menu_icon}/> },
    { title: 'Suchen', path: '/search', icon: <Search className={scss.aside_menu_icon}/> },
    { title: 'Einstellungen', path: '/setting', icon: <Settings className={scss.aside_menu_icon}/> },
    { title: 'Galerie', path: '/galery', icon: <Images className={scss.aside_menu_icon}/> },
    { title: 'Datenbank', path: '/database', icon: <LibraryBig className={scss.aside_menu_icon}/> },
    { title: 'About', path: '/about', icon: <CircleHelp className={scss.aside_menu_icon}/> }
  ]
  
  if(permission.role(['Admin']).permited()) paths.push(...adminPaths)

  if(permission.role(['Creator']).permited()) paths.push(...creatorPaths)

  const openAuthorizationModal = (modal: 'login' | 'registrate'): void => {
    searchParams.set({ [`is-${modal}-modal-open`]: !JSON.parse(searchParams.get(`is-${modal}-modal-open`) || 'false') })
    searchParams.remove([URL_SEARCH_PARAMS['IS-SIDE-MENU-OPEN']])
  }

  return(
    <div className={scss.aside_menu_container}>
      <aside className={`${!isSideMenuOpen ? scss.aside_menu_body : `${scss.aside_menu_container_visible} ${scss.aside_menu_body}`} flex-column-normal-normal-medium`}>
        <div className={scss.aside_menu_user_action}>
          {auth.user ?
          <div className='flex-column-normal-normal-none'>
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
        </div>
        <div className='flex-column-normal-normal-none'>
          <p className={scss.aside_menu_title}>Menu</p>
          {auth.isAuthPending ?
          <SideMenuLoader/> :
          <section className='flex-column-normal-normal-small'>
            {paths.map(path => (
              <Link className={(pathname.split('/')[1] === path.path.split('/')[1]) ? `${scss.aside_link_active} flex-row-center-normal-medium` : `flex-row-center-normal-medium`} key={path.title} to={path.path}>
                {path.icon}
                <p className={scss.aside_menu_text_wrapper}>{path.title}</p>
              </Link>
            ))}
          </section>}
        </div>
        {creator.contentDraft.length > 0 &&
        <div className='flex-column-normal-normal-none'>
          <p className={scss.aside_menu_title}>Draft's</p>
          <section className='flex-column-normal-normal-small'>
            {creator.contentDraft
              .slice(0, 5)
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