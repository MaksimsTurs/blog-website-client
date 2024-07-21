import scss from './pagination.module.scss'
import '@/scss/global.scss'

import { MoveLeft, MoveRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import useSearchParams from '@/custom-hook/use-search-params/useSearchParams';

import type { PaginationProps } from "./pagination.type";

export default function Pagination({ pagesCount, disableOn }: PaginationProps) {
  const { pathname } = useLocation()
  const searchParams = useSearchParams()

  const currPage: number = parseInt(searchParams.get('page') || '0')
  const disableClassName: string = disableOn ? scss.pagination_button_disabled : ''

  const go = (to: 'next' | 'preview'): void => {
    if(to === 'next') {
      const nextPage: number = (currPage + 1) > (pagesCount - 1) ? currPage : (currPage + 1) 
      searchParams.set({ 'page': nextPage })
    } else {
      const previewPage: number = (currPage - 1) < 0 ? 0 : (currPage - 1)
      searchParams.set({ 'page': previewPage })
    }
  }

  return(
    <div className={`${scss.pagination_container} flex-row-center-space-between-none`}>
      <button className={`${scss.pagination_button_style} flex-row-center-center-none`} onClick={() => go('preview')}><MoveLeft /></button>
      <ul className={`${scss.pagination_body} flex-row-center-normal-small`}>
        {currPage >= 3 ?
         <Link 
          tabIndex={-1}
          className={`${disableClassName} ${scss.pagination_button_style} flex-row-center-center-none`} 
          to={`${pathname}?page=${0}`}>
           ...
          </Link> : null}
        {[...Array(pagesCount)].map((_, page) => (
          <li key={page}>
            <Link 
              tabIndex={-1}
              className={page === currPage ? `${disableClassName} ${scss.pagination_curr_page} ${scss.pagination_button_style} flex-row-center-center-none` : `${scss.pagination_button_style} flex-row-center-center-none`} 
              to={`${pathname}?page=${page}`}>
                {page}
            </Link>
          </li>
        )).slice(currPage - (currPage === 1 ? 1 : 2), currPage)}
        {[...Array(pagesCount)].map((_, page) => (
          <li key={page}>
            <Link 
              tabIndex={-1}
              className={page === currPage ? `${disableClassName} ${scss.pagination_curr_page} ${scss.pagination_button_style} flex-row-center-center-none` : `${scss.pagination_button_style} flex-row-center-center-none`} 
              to={`${pathname}?page=${page}`}>
                {page}
            </Link>
          </li>
        )).slice(currPage, currPage + 1)}
        {[...Array(pagesCount)].map((_, page) => (
          <li key={page}>
            <Link 
              tabIndex={-1}
              className={page === currPage ? `${disableClassName} ${scss.pagination_curr_page} ${scss.pagination_button_style} flex-row-center-center-none` : `${scss.pagination_button_style} flex-row-center-center-none`} 
              to={`${pathname}?page=${page}`}>
                {page}
            </Link>
          </li>
        )).slice(currPage + 1, currPage + 3)}
        {currPage <= pagesCount - 4 ?
         <Link 
           tabIndex={-1}
           className={`${disableClassName} ${scss.pagination_button_style} flex-row-center-center-none`} 
           to={`${pathname}?page=${pagesCount - 1}`}>
           ...
          </Link> : null}
      </ul>
      <button className={`${scss.pagination_button_style} flex-row-center-center-none`} onClick={() => go('next')}><MoveRight /></button>
    </div>
  )
}