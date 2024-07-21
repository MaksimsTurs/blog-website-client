import scss from './empty.module.scss'

import type { CSSProperties } from 'react';
import type { EmptyProps } from "./empty.type";

export default function Empty({ label, option }: EmptyProps) {
  const sizes = { SMALL: 1, MEDIUM: 1.25, LARGE: 1.5 }
  const align = { CENTER: 'center', LEFT: 'left', RIGHT: 'right' }
  const height = { SMALL: '10%', MEDIUM: '50%', FULL: '100%' }

  let style: CSSProperties = {
    fontSize: `${sizes[option?.size || 'MEDIUM']}rem`,
    textAlign: align[option?.align || 'CENTER'] as CSSProperties['textAlign'],
    height: height[option?.height || 'FULL']
  } 

  if(option?.flexCenterCenter) style = {...style, display: 'flex', alignItems: 'center', justifyContent: 'center' }

  return <div style={style} className={scss.empty_container}><p>{label}</p></div>
}