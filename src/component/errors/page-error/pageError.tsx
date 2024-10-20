import scss from './pageError.module.scss'
import '@/scss/global.scss'

import type { PageErrorProps } from './pageError.type'

import Button from '@/component/buttons/button/button'

export default function PageError({ error, description }: PageErrorProps) {
  const reloadPage = (): void => {
    window.location.reload()
  }

  return(
    <div className={`${scss.error_container} flex-row-center-center-none`}>
      <div className={`${scss.error_body} flex-column-normal-normal-none`}>
        <div className={`flex-column-normal-normal-none`}>
          <p className={scss.error_code}>Error - {error.code}!</p>
          <div className='flex-column-normal-normal-small '>
            <p className={scss.error_message}>{error.message}</p>
            {description && <p className={scss.error_message}>{description}</p>}
            <Button className={scss.error_reload_button} onClick={reloadPage}>Seite neu laden?</Button>
          </div>
        </div>
      </div>
    </div>
  )
}