import scss from './formWrapper.module.scss'
import '@/scss/global.scss'

import { Ban } from 'lucide-react'

import type { FormWrapperProps } from './formWrapper.type'

export default function FormWrapper({ 
  onSubmit, 
  children, 
  errors, 
  isPending, 
  buttonLabel, 
  className, 
  style
}: FormWrapperProps) {
  const label: string = isPending ? 'Submiting...' : (buttonLabel || 'Submit')
  const buttonClassName: string = isPending ? `${scss.form_button_pending} ${scss.form_button}` : scss.form_button

  return(
    <form tabIndex={-1} onSubmit={onSubmit} className={`flex-column-normal-normal-none ${className}`}>
      <div style={style} className={`${scss.form_body} main-content-container flex-column-normal-normal-medium`}>
        {children}
        {(errors && errors.length > 0) ? <div style={{ width: '100%' }}>{errors.map(error => <div key={error} className={`${scss.form_error} flex-row-center-center-medium`}><Ban size={15}/><p key={error}>{error}</p></div>) }</div> : null}
        {buttonLabel && <button className={buttonClassName} disabled={isPending}>{label}</button>}
      </div>
    </form>
  )
}