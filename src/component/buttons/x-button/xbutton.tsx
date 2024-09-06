import scss from './xbutton.module.scss'
import '@/scss/global.scss'

import { X } from 'lucide-react'

import type { XButtonProps } from './xbutton.type'

export default function XButton({ onClick }: XButtonProps) {
  return <button className={`${scss.xbutton_style} flex-row-center-center-none`} onClick={onClick} type='button'><X size={15}/></button>
}