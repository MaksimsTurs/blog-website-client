import scss from './button.module.scss'

import type { ButtonProps } from "./button.type";
import type { PropsWithChildren } from 'react';

export default function Button({ label, className, onClick, type, isDisable, children }: PropsWithChildren<ButtonProps>) {
  return(
    <button type={type || 'button'} style={{ width: `${label.length * 13}px` }} disabled={isDisable} className={`${scss.button} ${className}`} onClick={onClick}>
      <section className={scss.button_label}>{label || children}</section>
    </button>
  )
}