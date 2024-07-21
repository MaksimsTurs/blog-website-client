import scss from './button.module.scss'

import type { ButtonProps } from "./button.type";

export default function Button({ label, className, onClick, type, isDisable }: ButtonProps) {
  return(
    <button type={type || 'button'} style={{ width: `${label.length * 13}px` }} disabled={isDisable} className={`${scss.button} ${className}`} onClick={onClick}>
      <section className={scss.button_label}>{label}</section>
    </button>
  )
}