import scss from './formWrapper.module.scss'
import '@/scss/global.scss'

import { Ban } from 'lucide-react'

import type { PropsWithChildren } from 'react'
import type { FormWrapperProps } from './formWrapper.type'

export default function FormWrapper({ 
  onSubmit, 
  children, 
  errors, 
  isPending, 
  buttonLabel, 
  className, 
  title,
  style
}: PropsWithChildren<FormWrapperProps>) {
  const label: string = isPending ? 'Submiting...' : (buttonLabel || 'Submit')
  const buttonClassName: string = isPending ? `${scss.form_button_pending} ${scss.form_button}` : scss.form_button

  return(
    <form tabIndex={-1} onSubmit={onSubmit} className={`${className} flex-column-normal-normal-none`}>
      {title ? <h3>{title}</h3> : null}
      <div style={style} className={`${scss.form_body} main-content-container flex-column-center-center-medium`}>
        {children}
        {(errors && errors.length > 0) ? <div style={{ width: '100%' }}>{errors.map(error => <div className={`${scss.form_error} flex-row-center-center-medium`}><Ban size={15}/><p key={error}>{error}</p></div>) }</div> : null}
        {buttonLabel ? <button className={buttonClassName} disabled={isPending}><section className='flex-row-center-center-medium'>{label}</section></button> : null}
      </div>
    </form>
  )
}