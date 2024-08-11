import scss from './localError.module.scss'
import '@/scss/global.scss'

import type { LocalErrorProps } from "./localError.type";

import { XCircle } from 'lucide-react';

export default function LocalError({ error }: LocalErrorProps) {
  return(
    <div className={`${scss.local_error_container} flex-row-center-normal-medium`}>
      <XCircle size={17}/>
      <p>{error}</p>
    </div>
  )
}
