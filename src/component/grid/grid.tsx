import scss from './grid.module.scss'
import '@/scss/global.scss'

import type { GridWrapperProps, GridWrapperItemProps, GridWrapperButtonProps } from './grid.type';

export function GridWrapper({ children, gap, size }: GridWrapperProps) {
  return <div style={{ gap, gridTemplateColumns: `repeat(auto-fill, minmax(${size || '10rem'}, 1fr))` }} className={scss.grid_wrapper}>{children}</div>
}

export function GridItem({ onClick, icon, children }: GridWrapperItemProps) {
  const defaultBackground: string[] = ['#F48023', '#1682FD']
  const defaultIcon: string = defaultBackground[Math.floor(Math.random() * 1)]
  
  icon = icon ? `url(${icon})` : defaultIcon

  return(
    <div className={scss.grid_item_body} onClick={onClick} style={{ background: icon, backgroundPosition: 'center center', backgroundSize: '100%' }}>
      <div className={`${scss.grid_item_title} flex-row-center-center-none`}>{children}</div>
    </div>
  )
}

export function GridButton({ onClick, children }: GridWrapperButtonProps) {
  return <button onClick={onClick} className={`${scss.grid_button} flex-row-center-center-none`}>{children}</button>
}