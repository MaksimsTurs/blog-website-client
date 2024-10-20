import scss from './selectInput.module.scss'
import '@/scss/global.scss'

import { type PropsWithChildren, useState } from 'react'
import type { SelectInputItemProps, SelectInputWrapperProps } from './selectInput.type'

import PaginationList from '@/component/pagination-list/paginationList'

export default function useSelect({ isMultiple, defaultValue }: { isMultiple?: boolean, defaultValue?: string[] }) {
  const [selected, select] = useState<string[]>(defaultValue || [])

  const pushNewValue = (value: string): void => {
    select(prev => {
      if(isMultiple && prev.includes(value)) return prev.filter(included => included !== value)
      else if(isMultiple) return [...prev, value]

      if(prev[0] === value) return []
      else return [value]
    })
  }

  const clear = (): void => {
    select([])
  }

  const reset = (): void => {
    select(defaultValue || [])
  }

  const include = (value: string): boolean => {
    return selected.includes(value)
  }

  return {
    selected,
    clear,
    reset,
    Wrapper: function({ children, title, className, pagesCount }: PropsWithChildren<SelectInputWrapperProps>) {
      return(
        <div className={scss.select_list_wrapper}>
          <h4 className={scss.select_list_title}>{title}</h4>
          {(pagesCount && pagesCount > 1) ? <div style={{ padding: '0.5rem 0rem' }}><PaginationList pagesCount={pagesCount}/></div> : null}
          <ul className={`${className || ''}`}>{children}</ul>
        </div>
      )
    },
    Item: function({ children, value }: PropsWithChildren<SelectInputItemProps>) {
      return <li onClick={() => pushNewValue(value)} className={`${scss.select_list_item} ${include(value) ? scss.select_list_item_selected : ''}`}>{children}</li>
    }
  } 
}