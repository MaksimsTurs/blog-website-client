import scss from './header.module.scss'
import '@/scss/global.scss'

import { Link } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import { Fragment } from 'react/jsx-runtime'

import useAuth from '@/custom-hook/useAuth/useAuth'
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'

import UserContainerLoader from './component/userContainerLoader'
import LoginModal from '../authorization-modal/loginModal'
import RegistrationModal from '../authorization-modal/registrateModal'
import ImageComponent from '../image-component/image'

export default function Header() {
  const auth = useAuth()
  const searchParams = useSearchParams()

  const openAuthorizationModal = (name: string): void => {
    searchParams.set({ [`${name}-modal`]: !JSON.parse(searchParams.get(`${name}-modal`) || 'false') })
  }

  return(
    <Fragment>
      <LoginModal/>
      <RegistrationModal/>
      <header className={`${scss.header_container} flex-row-center-space-between-none`}>
        <Link className={scss.header_website_name} to='/'>Ruzzkyi Mir</Link>
        {auth.isAuthPending ? <UserContainerLoader/> :
        !auth.user ? 
        <section className={`${scss.header_user_action_container} flex-row-center-normal-none`}>
          <button className='flex-row-center-center-none' onClick={() => openAuthorizationModal('registration')}>
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