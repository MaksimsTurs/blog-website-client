import scss from './page.module.scss'
import '@/scss/global.scss'

import { Link } from 'react-router-dom'

import useMetadata from '@/custom-hook/use-metadata/useMetadata'

export default function Page() {
  useMetadata({ title: 'Über mich' })

  return(
    <div className={`${scss.about_page_container} main-content-container`}>
      <h3 className={scss.about_page_container_title}>Contact:</h3>
      <div className={scss.about_page_body}>
        <p className={`${scss.about_body_name} flex-row-normal-normal-small`}>E-Mail für Bilder, Video und Links über Russische verbrechen und andere information: <Link target='_blank' to={'https://mail.google.com/mail/?view=cm&fs=1&to=antifagmbh31@gmail.com'}>antifagmbh31@gmail.com</Link></p>
      </div>
    </div>
  )
}