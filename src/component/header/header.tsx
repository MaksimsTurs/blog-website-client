import scss from './header.module.scss'
import '@/scss/global.scss'

import { Link } from 'react-router-dom'
import { UserPlus, X } from 'lucide-react'
import { Fragment } from 'react/jsx-runtime'

import useAuth from '@/custom-hook/useAuth/useAuth'
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'

import UserContainerLoader from './component/userContainerLoader'
import LoginModal from '../authorization-modal/loginModal'
import RegistrationModal from '../authorization-modal/registrateModal'
import ImageComponent from '../image-component/image'

import { MODALS_KEYS } from '@/conts'

export default function Header() {
  const auth = useAuth()
  const searchParams = useSearchParams()
  const isSideMenuOpen: boolean = JSON.parse(searchParams.get(MODALS_KEYS['IS-SIDE-MENU-OPEN']) || 'false')

  const openAuthorizationModal = (modal: 'login' | 'registrate'): void => {
    let otherModalState: boolean = false
    const currState: boolean = JSON.parse(searchParams.get(`${modal}-modal`) || 'false')
    
    if(modal === 'login') {
      otherModalState = JSON.parse(searchParams.get(MODALS_KEYS['REGISTRATE-MODAL']) || 'false')
    } else {
      otherModalState = JSON.parse(searchParams.get(MODALS_KEYS['LOGIN-MODAL']) || 'false')
    }

    if(otherModalState) return

    searchParams.set({ [`${modal}-modal`]: !currState })
  }

  const changeSideMenuVisibility = (): void => {
    const currState: boolean = JSON.parse(searchParams.get(MODALS_KEYS['IS-SIDE-MENU-OPEN']) || 'false')
    searchParams.set({ [MODALS_KEYS['IS-SIDE-MENU-OPEN']]: !currState })
  }

  return(
    <Fragment>
      <LoginModal/>
      <RegistrationModal/>
      <header className={`${scss.header_container} flex-row-center-space-between-none`}>
        <div style={{ width: '100%' }} className='flex-row-center-normal-none'>
          <button onClick={changeSideMenuVisibility} className={scss.header_side_menu_button}>
            {isSideMenuOpen ? 
            <X/> :
            <Fragment>
              <span></span>
              <span></span>
              <span></span>
            </Fragment>}
          </button>
          <Link className={scss.header_website_name} to='/'>Ruzzkyi Mir</Link>
        </div>
        {auth.isAuthPending ? <UserContainerLoader/> :
        !auth.user ? 
        <section className={`${scss.header_user_action_container} flex-row-center-normal-none`}>
          <button className='flex-row-center-center-none' onClick={() => openAuthorizationModal('registrate')}>
            <section className={`${scss.header_user_text} flex-row-center-normal-medium`}><UserPlus />Registrate</section>
          </button>
          <button onClick={() => openAuthorizationModal('login')}>Login</button>
        </section> : 
        <section className={`${scss.header_user_container} flex-row-center-center-medium`}>
          <Link className={scss.header_user_link} to={`/user/${auth.user._id}`}><ImageComponent styles={{ loader: { width: '2rem', height: '2rem' }}} src={auth.user.avatar} alt={auth.user.name}/></Link>
        </section>}
      </header>
    </Fragment>
  )
}