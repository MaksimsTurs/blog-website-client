import scss from './page.module.scss'
import '@/scss/global.scss'

import HomeLoader from '../home/loader';
import Empty from '@/component/empty/empty';
import Error from '@/component/error/error';
import Button from '@/component/button/button'
import Pagination from '@/component/pagination/pagination'
import PostContainer from '@/component/post-container/postContainer'
import SortInput from './component/sortInput';
import PaginationLoader from '@/component/pagination/component/paginationLoader';
import TextTagInput from '@/component/input/text-tag-input/textTagInput';

import { ArrowDownWideNarrow, ArrowUpNarrowWide, Eye, Filter, Heart, MessageCircle } from 'lucide-react';
import { Fragment, useRef, useState } from 'react';

import type { SortData, SortOption, SortedPosts } from './page.type';

import useRequest from '@/custom-hook/_use-request/useRequest';
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams';
import useOutsideClick from '@/custom-hook/use-outside-click/useOutsideClick';

import fetcher from '@/lib/fetcher/fetcher';
import coockie from '@/lib/coockie/coockie';

import { URL_SEARCH_PARAMS } from '@/conts';

const sortOptions = [
  { name: 'Likes', icon: <Heart size={17}/> },
  { name: 'Views', icon: <Eye size={17}/> },
  { name: 'Comments', icon: <MessageCircle size={17}/> }
]

const is930px: boolean = window.matchMedia('(width <= 930px)').matches

export default function Search() {
  const [sortData, setSortData] = useState<SortData>({ author: '', content: '', title: '' })
  const [sortOption, setSortOption] = useState<SortOption>()
  
  const searchParams = useSearchParams()

  const selectedTag: string | null = searchParams.get('tag')
  const page: number = parseInt(searchParams.get('page') || '0')
  
  const tagRef = useRef<string[]>(selectedTag ? [selectedTag] : [])
  const modalContainerRef = useRef<HTMLDivElement>(null)
  
  const isOpen: boolean = !is930px ? true : useOutsideClick(URL_SEARCH_PARAMS['IS-FILTER-MODAL-OPEN'], modalContainerRef)  

  const { isPending, data, error, request } = useRequest<SortedPosts>({ 
    deps: [`sort-${page}`],
    noCache: true,
    request: async () => await fetcher.post<SortedPosts>(`/sort/${page}`, {...sortData, sortOption, tags: tagRef.current }, { 'Authorization': `Bearer ${coockie.getOne('PR_TOKEN')}` }) 
  })

  const changeSort = (name: string): void => {
    if(sortOption?.[name] === 'descending') setSortOption({ [name]: 'ascending' })
    else if(sortOption?.[name] === 'ascending') setSortOption({ [name]: undefined })
    else setSortOption({ [name]: 'descending' })
  }

  const getTags = (tags: string[]): void => {
    tagRef.current = tags
  }

  const changeSortData = (name: string, value: any): void => {
    setSortData(prev => ({...prev, [name]: value }))
  }

  const resetSort = (): void => {
    setSortData({ author: '', content: '', title: '' })
    setSortOption(undefined)
    searchParams.set({ 'page': 0 })
  }

  const openFilterModal = (): void => {
    searchParams.set({ [URL_SEARCH_PARAMS['IS-FILTER-MODAL-OPEN']]: true })
  }

  const getSorted = (): void => {
    if(page === 0) request()
    else searchParams.set({ 'page': 0 })
  }

  return(
    <Fragment>
      {error ? <Error code={error.code} message={error.message}/> : 
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
                  onClick={() => changeSort(option.name)}
                  className={sortOption?.[option.name] ? `${scss.search_sort_button} ${scss.search_sort_button_active} flex-row-center-center-medium` : `${scss.search_sort_button} flex-row-center-center-medium`}>
                  {option.icon}
                  <p>{option.name}</p>
                  {sortOption?.[option.name] === 'descending' ? <ArrowDownWideNarrow size={14}/> : sortOption?.[option.name] === 'ascending' ?  <ArrowUpNarrowWide size={14}/> : null }
                </button>
              ))}
            </div>
            <SortInput changeSortData={changeSortData} sortData={sortData} sortDataName='content'/>
            <SortInput changeSortData={changeSortData} sortData={sortData} sortDataName='author'/>
            <SortInput changeSortData={changeSortData} sortData={sortData} sortDataName='title'/>
            <TextTagInput getTags={getTags} placeholder='Find by tags'/>
            <div className={`${scss.search_filter_body_buttons} flex-row-normal-normal-small`}>
              <Button onClick={getSorted} label="Sort"/>
              <Button onClick={resetSort} label="Reset"/>
            </div>
          </div>
        </div>
      </div>}
    </Fragment>
  )
}