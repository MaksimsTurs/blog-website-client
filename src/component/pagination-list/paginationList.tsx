import scss from './paginationList.module.scss'
import '@/scss/global.scss'

import { MoveLeft, MoveRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

import type { PaginationListProps } from './paginationList.type'

import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'

export default function PaginationList({ pagesCount, listKey }: PaginationListProps) {
  const { pathname } = useLocation()
  const searchParams = useSearchParams()

  const LIST_PAGINATION_KEY: string = `${listKey || 'list'}-page`

  const currPage: number = parseInt(searchParams.get(LIST_PAGINATION_KEY) || '0')

  const go = (to: 'next' | 'preview'): void => {
    if(to === 'next') {
      const nextPage: number = (currPage + 1) > (pagesCount - 1) ? currPage : (currPage + 1) 
      searchParams.set({ [LIST_PAGINATION_KEY]: nextPage })
    } else {
      const previewPage: number = (currPage - 1) < 0 ? 0 : (currPage - 1)
      searchParams.set({ [LIST_PAGINATION_KEY]: previewPage })
    }
  }

  const goTo = (to: number): void => {
    searchParams.set({ [LIST_PAGINATION_KEY]: to })
  }

  return(
    <section className={`${scss.pagination_list_container} flex-row-normal-space-between-medium`}>
      <button onClick={() => go('preview')} className={`${scss.pagination_list_button} flex-row-center-center-none`}><MoveLeft/></button>
      <div className='flex-row-normal-normal-none'>
        {currPage - 3 >= 0 ?
         <Link 
           className={`${scss.pagination_list_button} flex-row-center-center-none`} 
           to={`${pathname}?${LIST_PAGINATION_KEY}=${0}`}>
           ...
          </Link> : null}
        {[...Array(pagesCount)].map((_, index) => <button key={index} onClick={() => goTo(index)} className={`${scss.pagination_list_button} ${currPage === index ? scss.pagination_curr_page : ''} flex-row-center-center-none`}>{index}</button>).slice(currPage - (currPage === 1 ? 1 : 2), currPage)}
        {[...Array(pagesCount)].map((_, index) => <button key={index} onClick={() => goTo(index)} className={`${scss.pagination_list_button} ${currPage === index ? scss.pagination_curr_page : ''} flex-row-center-center-none`}>{index}</button>).slice(currPage, currPage + 1)}
        {[...Array(pagesCount)].map((_, index) => <button key={index} onClick={() => goTo(index)} className={`${scss.pagination_list_button} ${currPage === index ? scss.pagination_curr_page : ''} flex-row-center-center-none`}>{index}</button>).slice(currPage + 1, currPage + 3)}
        {currPage + 3 < pagesCount ?
         <Link 
           className={`${scss.pagination_list_button} flex-row-center-center-none`} 
           to={`${pathname}?${LIST_PAGINATION_KEY}=${pagesCount - 1}`}>
           ...
          </Link> : null}
      </div>
      <button onClick={() => go('next')} className={`${scss.pagination_list_button} flex-row-center-center-none`}><MoveRight/></button>
    </section>
  )
}