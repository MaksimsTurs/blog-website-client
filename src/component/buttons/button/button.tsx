import scss from './button.module.scss'

import type { ButtonProps } from "./button.type";
import type { PropsWithChildren } from 'react';

export default function Button({ onClick, className, type, isDisable, children }: PropsWithChildren<ButtonProps>) {
  return <button type={type || 'button'} disabled={isDisable} className={`${scss.button} ${className}`} onClick={onClick}>{children}</button>
}