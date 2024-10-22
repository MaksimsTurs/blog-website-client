import scss from './header.module.scss'
import '@/scss/global.scss'

import { Link } from 'react-router-dom'
import { AlignJustify, UserPlus, X } from 'lucide-react'
import { Fragment } from 'react/jsx-runtime'

import useAuth from '@/custom-hook/use-auth/useAuth'
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'

import UserContainerLoader from './component/userContainerLoader'
import LoginModal from '../modals/authorization-modal/loginModal'
import RegistrationModal from '../modals/authorization-modal/registrateModal'
import ImageComponent from '../image-component/image'

import { URL_SEARCH_PARAMS } from '@/conts'

export default function Header() {
  const auth = useAuth()
  const searchParams = useSearchParams()

  const isSideMenuOpen: boolean = JSON.parse(searchParams.get(URL_SEARCH_PARAMS['IS-SIDE-MENU-OPEN']) || 'false')

  const openAuthorizationModal = (modal: 'login' | 'registrate'): void => {
    let otherModalState: boolean = false
    const currState: boolean = JSON.parse(searchParams.get(`is-${modal}-modal-open`) || 'false')
    
    if(modal === 'login') {
      otherModalState = JSON.parse(searchParams.get(URL_SEARCH_PARAMS['IS-REGISTRATE-MODAL-OPEN']) || 'false')
    } else {
      otherModalState = JSON.parse(searchParams.get(URL_SEARCH_PARAMS['IS-LOGIN-MODAL-OPEN']) || 'false')
    }

    //When other modal open, don't open selected modal
    if(otherModalState) return

    searchParams.set({ [`is-${modal}-modal-open`]: !currState })
  }

  const changeSideMenuVisibility = (): void => {
    const currState: boolean = JSON.parse(searchParams.get(URL_SEARCH_PARAMS['IS-SIDE-MENU-OPEN']) || 'false')
    searchParams.set({ [URL_SEARCH_PARAMS['IS-SIDE-MENU-OPEN']]: !currState })
  }

  return(
    <Fragment>
      <LoginModal/>
      <RegistrationModal/>
      <header className={`${scss.header_container} flex-row-center-space-between-none`}>
        <div className={`${scss.header_website_name_container} flex-row-center-normal-none`}>
          <button onClick={changeSideMenuVisibility} className={scss.header_side_menu_button}>{isSideMenuOpen ? <X/> : <AlignJustify />}</button>
          <Link className={scss.header_website_name} to='/'>Ruzzkyi Mir</Link>
        </div>
        {auth.isAuthPending ? <UserContainerLoader/> :
        !auth.user ? 
        <section className={`${scss.header_user_action_container} flex-row-center-normal-medium`}>
          <button className={`${scss.header_user_action_button} flex-row-center-normal-medium`} onClick={() => openAuthorizationModal('registrate')}>
            <UserPlus/>Registrate
          </button>
          <button className={scss.header_user_action_button} onClick={() => openAuthorizationModal('login')}>Login</button>
        </section> :
        <section className={`${scss.header_user_action_container} flex-row-center-center-medium`}>
          <Link className={scss.header_user_link} to={`/user/${auth.user._id}`}><ImageComponent styles={{ svg: { width: '2rem', height: '2rem' }, loader: { width: '2rem', height: '2rem' }}} src={auth.user.avatar} alt={auth.user.name}/></Link>
        </section>}
      </header>
    </Fragment>
  )
}