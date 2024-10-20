import scss from './page.module.scss'
import '@/scss/global.scss'

import { Link } from 'react-router-dom'

export default function Page() {
  return(
    <div className='main-content-container'>
      <h3 className={scss.about_page_container_title}>Contacts:</h3>
      <div className={scss.about_page_body}>
        <p className={`${scss.about_body_name} flex-row-normal-normal-small`}>Email: <Link target='_blank' to='https://mail.google.com/mail/?view=cm&fs=1&to=antifagmbh31@gmail.com'>antifagmbh31@gmail.com</Link></p>
        <p className={`${scss.about_body_name} flex-row-normal-normal-small`}>Twitter: <Link target='_blank' to='https://x.com/MaksimsTurs'>Russki Mir</Link></p>
      </div>
    </div>
  )
}
