import scss from './selectInput.module.scss'
import '@/scss/global.scss'

import { PropsWithChildren, useState } from 'react'

export default function useSelect({ isMultiple }: { isMultiple?: boolean }) {
  const [selected, select] = useState<string[]>([])

  const pushNewValue = (value: string): void => {
    select(prev => {
      if(isMultiple && prev.includes(value)) {
        return prev.filter(included => included !== value)
      } else if(isMultiple) {
        return [...prev, value]
      }

      if(prev[0] === value) {
        return []
      } else {
        return [value]
      }
    })
  }

  const reset = () => {
    select([])
  }

  const isInclude = (value: string): boolean => {
    return selected.includes(value)
  }

  return {
    selected,
    reset,
    SelectInput: function({ children, title }: PropsWithChildren<{ title: string }>) {
      return <ul className={`${scss.select_list_wrapper} main-content-container`}><li className={scss.select_list_title}>{title}</li>{children}</ul>
    },
    SelectItem: function({ children, value }: PropsWithChildren<{ value: string }>) {
      return <li onClick={() => pushNewValue(value)} className={`${scss.select_list_item} ${isInclude(value) ? scss.select_list_item_selected : ''}`}>{children}</li>
    }
  } 
}