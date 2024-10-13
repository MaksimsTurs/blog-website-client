import scss from './page.module.scss'
import '@/scss/global.scss'

import _PostContainer from '@/component/post-container/postContainer'
import HomeLoader from '../home/loader';
import Empty from '@/component/empty/empty';
import PageError from '@/component/errors/page-error/pageError';
import Button from '@/component/buttons/button/button'
import Pagination from '@/component/pagination/pagination'
import SortInput from './component/sortInput';
import PaginationLoader from '@/component/pagination/component/paginationLoader';
import TextTagInput from '@/component/input/text-tag-input/textTagInput';

import { ArrowDownWideNarrow, ArrowUpNarrowWide, Eye, Filter, Heart, MessageCircle } from 'lucide-react';
import { Fragment, memo, useRef, useState } from 'react';

import type { FilterOptions, SortedPosts } from './page.type';
import type { CustomInputsRef } from '@/global.type';

import useRequest from '@/custom-hook/use-request/useRequest';
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams';
import useOutsideClick from '@/custom-hook/use-outside-click/useOutsideClick';

import fetcher from '@/lib/fetcher/fetcher';

import { URL_SEARCH_PARAMS, AUTHORIZATION_OBJECT } from '@/conts';

const PostContainer = memo(_PostContainer)

const is930px: boolean = window.matchMedia('(width <= 930px)').matches

const sortOptions = [
  { name: 'Likes', icon: <Heart size={17}/> },
  { name: 'Views', icon: <Eye size={17}/> },
  { name: 'Comments', icon: <MessageCircle size={17}/> }
]

export default function Search() {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({ author: '', content: '', title: '' })
  
  const searchParams = useSearchParams()

  const selectedTag: string | null = searchParams.get('tag')
  const page: number = parseInt(searchParams.get('page') || '0')
  
  const modalContainerRef = useRef<HTMLDivElement>(null)
  const sortTagRef = useRef<CustomInputsRef<string[]>>()
  
  const isOpen: boolean = !is930px ? true : useOutsideClick(URL_SEARCH_PARAMS['IS-FILTER-MODAL-OPEN'], modalContainerRef)  

  const { isPending, data, error, request } = useRequest<SortedPosts>({ 
    deps: [`sort-${page}`],
    noCache: true,
    request: async () => await fetcher.post<SortedPosts>(`/sort/${page}`, {...filterOptions, tags: sortTagRef.current?.value }, AUTHORIZATION_OBJECT) 
  })

  const changeFilterData = (name: string, value?: any): void => {
    if(value) {
      setFilterOptions(prev => ({...prev, [name]: value }))
      return
    }

    setFilterOptions(prev => {
      if(prev.sortOption?.[name] === 'ascending')       prev = {...prev, sortOption: { [name]: undefined }}
      else if(prev.sortOption?.[name] === 'descending') prev = {...prev, sortOption: { [name]: 'ascending' }}
      else                                              prev = {...prev, sortOption: { [name]: 'descending' }}
      return prev
    })
  }

  const resetSort = (): void => {
    setFilterOptions({ author: '', content: '', title: '' })
    searchParams.set({ 'page': 0 })
    if(sortTagRef.current) sortTagRef.current.clear()
  }

  const openFilterModal = (): void => {
    searchParams.set({ [URL_SEARCH_PARAMS['IS-FILTER-MODAL-OPEN']]: true })
  }

  const getBySortOptions = (): void => {
    if(page === 0) request()
    else searchParams.set({ 'page': 0 })
  }

  return(
    <Fragment>
      {error ? <PageError error={error}/> : 
      <div style={{ height: '100%' }} className='flex-row-normal-normal-medium'>
        <div style={{ width: '100%', minHeight: '100%' }} className='flex-column-normal-normal-small'>
          {is930px ? <Filter onClick={openFilterModal} className={scss.search_filter_modal_button}/> : null}
          {isPending ? <PaginationLoader/> : data && data.pagesCount > 1 ? <Pagination pagesCount={data.pagesCount}/> : null}
          {isPending ? <HomeLoader/> : 
          data && data.posts.length === 0 ? <Empty option={{ flexCenterCenter: true, height: 'FULL' }} label='Nothing found!'/> : 
          data && data.posts.map(post => <PostContainer key={post._id} post={post} type="preview"/>)}
          {isPending ? <PaginationLoader/> : data && data.pagesCount > 1 ? <Pagination pagesCount={data.pagesCount}/> : null}
        </div>
        <div ref={modalContainerRef} className={isOpen ? scss.search_filter_container : `${scss.search_filter_container} ${scss.search_filter_container_hidden}`}>
          <div className='main-content-container flex-column-normal-normal-small'>
              <p className={scss.search_sort_type_title}>Sort by</p>
              <div className='flex-column-normal-normal-small'>
                {sortOptions.map(option => (
                  <button
                    key={option.name}
                    onClick={() => changeFilterData(option.name)}
                    className={filterOptions.sortOption?.[option.name] ? `${scss.search_sort_button} ${scss.search_sort_button_active} flex-row-center-center-medium` : `${scss.search_sort_button} flex-row-center-center-medium`}>
                    {option.icon}
                    <p>{option.name}</p>
                    {filterOptions.sortOption?.[option.name] === 'descending' ? <ArrowDownWideNarrow size={14}/> : filterOptions.sortOption?.[option.name] === 'ascending' ?  <ArrowUpNarrowWide size={14}/> : null }
                  </button>
                ))}
              </div>
              <SortInput changeFilterData={changeFilterData} filterData={filterOptions} filterDataName='content'/>
              <SortInput changeFilterData={changeFilterData} filterData={filterOptions} filterDataName='author'/>
              <SortInput changeFilterData={changeFilterData} filterData={filterOptions} filterDataName='title'/>
              <TextTagInput ref={sortTagRef} value={[selectedTag || '', ...sortTagRef.current?.value || []]} placeholder='Find by tags'/>
              <div className={`flex-row-normal-normal-small`}>
                <Button className={scss.search_filter_button} onClick={getBySortOptions}>Sortieren</Button>
                <Button className={scss.search_filter_button} onClick={resetSort}>Wiederherstellen</Button>
              </div>
            </div>
        </div>
      </div>}
    </Fragment>
  )
}