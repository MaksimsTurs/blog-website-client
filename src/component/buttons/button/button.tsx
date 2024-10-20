import scss from './button.module.scss'
import '@/scss/global.scss'

import type { ButtonProps } from "./button.type";

export default function Button({ onClick, className, type, isDisable, children }: ButtonProps) {
  return <button type={type || 'button'} disabled={isDisable} className={`${scss.button} ${className} flex-row-center-center-none`} onClick={onClick}>{children}</button>
}