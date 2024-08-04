import scss from './sideMenu.module.scss'
import '@/scss/global.scss'

import { Link, useLocation } from 'react-router-dom'
import { Home, Search, Settings, Shield, SquarePen, UserPlus } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Fragment } from 'react/jsx-runtime'

import useAuth from '@/custom-hook/useAuth/useAuth'
import usePermitor from '@/custom-hook/use-permitor/useHavePermission'
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'

import ImageComponent from '../image-component/image'
import SideMenuLoader from './component/sideMenuLoader'

import type { CreatorState } from '@/store/creator/creator.type'
import type { RootState } from '@/store/store'

const adminPaths = [
  { title: 'Admin', path: '/admin/post', icon: <Shield className={scss.aside_menu_icon}/> },
  { title: 'Write post', path: '/write-post', icon: <SquarePen className={scss.aside_menu_icon}/> }
]

const creatorPaths = [
  { title: 'Write post', path: '/write-post', icon: <SquarePen className={scss.aside_menu_icon}/> }
]

const SPECIAL_CHARACTERS: RegExp = /[\#\[\]\{\}\(\)]/g
const is830px: boolean = window.matchMedia('(width <= 830px)').matches

export default function SideMenu() {
  const { pathname } = useLocation()
  const searchParams = useSearchParams()
  const auth = useAuth()
  const permission = usePermitor()
  const creator = useSelector<RootState, CreatorState>(state => state.creator)

  const isPostPage: boolean = pathname.search(/post/) > -1
  const isSideMenuOpen: boolean = is830px ? JSON.parse(searchParams.get('is-side-menu-open') || 'false') : true

  const paths = [
    { title: 'Home', path: '/', icon: <Home className={scss.aside_menu_icon}/> },
    { title: 'Search', path: '/search', icon: <Search className={scss.aside_menu_icon}/> },
    { title: 'Settings', path: '/setting', icon: <Settings className={scss.aside_menu_icon}/> },
  ]

  if(permission.role(['Admin']).permited()) paths.push(...adminPaths)

  if(permission.role(['Creator']).permited()) paths.push(...creatorPaths)

  const openAuthorizationModal = (modal: 'login' | 'registrate'): void => {
    searchParams.set({ [`${modal}-modal`]: !JSON.parse(searchParams.get(`${modal}-modal`) || 'false') })
    searchParams.remove(['is-side-menu-open'])
  }

  return(
    <div style={(isPostPage && is830px) ? { paddingLeft: '0rem' } : undefined} className={scss.aside_menu_container}>
      <aside className={`${is830px ? scss.aside_menu_extra_width : ''}  ${isSideMenuOpen ? scss.aside_menu_body : `${scss.aside_menu_container_hidden} ${scss.aside_menu_body}`} flex-column-normal-normal-medium`}>
        {is830px && auth.user ?
        <div className='flex-column-normal-normal-none'>
          <p className={scss.aside_menu_title}>User</p>
          <Link to={`/user/${auth.user?._id}`} className={'flex-row-center-normal-medium'}>
            <ImageComponent classNames={{ svg: scss.aside_menu_user_avatar, img: scss.aside_menu_user_avatar }} src={auth.user?.avatar} alt={auth.user?.name || 'User avatar'}/>
            <p>{auth.user?.name}</p>
          </Link>
        </div> :
        is830px &&
        <Fragment>
          <button className='flex-row-center-normal-medium' onClick={() => openAuthorizationModal('login')}>
            <UserPlus className={scss.aside_menu_icon}/>
            <p>Login</p>
          </button>
          <button className='flex-row-center-normal-medium' onClick={() => openAuthorizationModal('registrate')}>
            <UserPlus className={scss.aside_menu_icon}/>
            <p>Registrate</p>
          </button>
        </Fragment>}
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
          <p className={scss.aside_menu_title}>Draft</p>
          <section className='flex-column-normal-normal-small'>
            {creator.contentDraft.slice(0, 5).map(draft => <Link className={scss.aside_menu_text_wrapper} key={draft._id} to={`/write-post?draft-id=${draft._id}`}>{draft.content.replace(SPECIAL_CHARACTERS, '').trim()}</Link>)}
          </section>
        </div>}
      </aside>
    </div>
  )
}