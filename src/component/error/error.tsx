import scss from './error.module.scss'
import '@/scss/global.scss'

import type { ErrorProps } from './error.type'

export default function Error({ code, message, underText }: ErrorProps) {
  return(
    <div className={`${scss.error_container} flex-row-center-center-none`}>
      <div className={scss.error_body}>
        <div className={`${scss.error_error} flex-column-normal-normal-none`}>
          <p>Error - {code}!</p>
          <p>{message}</p>
        </div>
        {underText ? <p>{underText}</p> : null}
      </div>
    </div>
  )
}