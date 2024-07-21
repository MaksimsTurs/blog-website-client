import scss from './sideMenu.module.scss'
import '@/scss/global.scss'

import { Link, useLocation } from 'react-router-dom'
import { Home, Search, Shield, SquarePen } from 'lucide-react'
import { useSelector } from 'react-redux'

import useAuth from '@/custom-hook/useAuth/useAuth'
import useHavePermission from '@/custom-hook/use-have-permission/useHavePermission'

import SideMenuLoader from './component/sideMenuLoader'

import type { CreatorState } from '@/store/creator/creator.type'
import type { RootState } from '@/store/store'

export default function SideMenu() {
  const { pathname } = useLocation()
  const auth = useAuth()
  const permission = useHavePermission()

  const creator = useSelector<RootState, CreatorState>(state => state.creator)
  const SPECIAL_CHARACTERS: RegExp = /[\#\[\]\{\}\(\)]/g
  
  const paths = [
    { title: 'Home', path: '/', icon: <Home /> },
    { title: 'Search', path: '/search', icon: <Search /> },
  ]

  if(permission.isHaveRole(['Admin']).result()) {
    paths.push(
      { title: 'Admin', path: '/admin/post', icon: <Shield /> },
      { title: 'Write post', path: '/write-post', icon: <SquarePen /> }
    )
  }

  if(permission.isHaveRole(['Creator']).result()) {
    paths.push({ title: 'Write post', path: '/write-post', icon: <SquarePen /> })
  }

  return(
    <aside className={`${scss.aside_menu_container} flex-column-normal-normal-medium`}>
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
      {creator.contentDraft.length > 0 ?
       <div className='flex-column-normal-normal-none'>
         <p className={scss.aside_menu_title}>Draft</p>
         <section className='flex-column-normal-normal-small'>
           {creator.contentDraft.slice(0, 5).map(draft => <Link className={scss.aside_menu_text_wrapper} key={draft._id} to={`/write-post?draft-id=${draft._id}`}>{draft.content.replace(SPECIAL_CHARACTERS, '').trim()}</Link>)}
         </section>
       </div> : null}
    </aside>
  )
}