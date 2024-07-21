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
import TagPreview from '@/component/tag-preview/tagPreview';

import { ArrowDownWideNarrow, ArrowUpNarrowWide, Eye, Heart, MessageCircle } from 'lucide-react';
import { Fragment, useState } from 'react';

import type { SortData, SortOption, SortedPosts } from './page.type';

import useRequest from '@/custom-hook/_use-request/_useRequest';
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams';

import fetcher from '@/lib/fetcher/fetcher';
import coockie from '@/lib/coockie/coockie';

const sortOptions = [
  { name: 'Likes', icon: <Heart size={17}/> },
  { name: 'Views', icon: <Eye size={17}/> },
  { name: 'Comments', icon: <MessageCircle size={17}/> }
]

export default function Search() {
  const searchParams = useSearchParams()

  const selectedTag: string | null = searchParams.get('tag')

  const [sortData, setSortData] = useState<SortData>({ tags: selectedTag ? [selectedTag] : [] , author: '', content: '', title: '' })
  const [sortOption, setSortOption] = useState<SortOption>()

  const page: number = parseInt(searchParams.get('page') || '0')

  const { isPending, data, error, request } = useRequest<SortedPosts>({ 
    deps: [`sort-${page}`],
    noCache: true,
    request: async () => await fetcher.post<SortedPosts>(`/sort/${page}`, {...sortData, sortOption }, { 'Authorization': `Bearer ${coockie.getOne('PR_TOKEN')}` }) 
  })

  const changeSort = (name: string): void => {
    if(sortOption?.[name] === 'descending') setSortOption({ [name]: 'ascending' })
    else if(sortOption?.[name] === 'ascending') setSortOption({ [name]: undefined })
    else setSortOption({ [name]: 'descending' })
  }

  const removeTag = (_tag: string): void => {
    setSortData(prev => ({...prev, tags: sortData.tags.filter((_, index) => index !== prev.tags.indexOf(_tag)) }))
  }

  const changeSortData = (name: string, value: any): void => {
    if(name === 'tags') setSortData(prev => ({...prev, tags: value.split(',') }))
    else setSortData(prev => ({...prev, [name]: value }))
  }

  const resetSort = (): void => {
    setSortData({ tags: [], author: '', content: '', title: '' })
    setSortOption(undefined)
    searchParams.set({ 'page': 0 })
  }

  const getSorted = (): void => {
    if(page === 0) request()
    else searchParams.set({ 'page': 0 })
  }

  return(
    <Fragment>
      {error ? <Error code={error.code} message={error.message}/> : 
      <div className='flex-row-normal-normal-medium'>
        <div style={{ width: '100%', height: '100%' }} className='flex-column-normal-normal-small'>
          {data ? <Pagination pagesCount={data.pagesCount}/> : <PaginationLoader/>}
          {isPending ? <HomeLoader/> : 
          data && data.posts.length === 0 ? <Empty option={{ flexCenterCenter: true }} label='Nothing found!'/> : 
          data && data.posts.map(post => <PostContainer key={post._id} post={post} type="preview"/>)}
          {data ? <Pagination pagesCount={data.pagesCount}/> : <PaginationLoader/>}
        </div>
        <div className={`${scss.search_filter_container} main-content-container flex-column-normal-normal-small`}>
          <p className={scss.search_sort_type_title}>Sort by</p>
          <div className='flex-row-normal-normal-small'>
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
          <SortInput changeSortData={changeSortData} sortData={sortData} sortDataName='tags'/>
          <TagPreview removeTag={removeTag} tags={sortData.tags}/>
          <div className={`${scss.search_filter_body_buttons} flex-row-normal-normal-small`}>
            <Button onClick={getSorted} label="Sort"/>
            <Button onClick={resetSort} label="Reset"/>
          </div>
        </div>
      </div>}
    </Fragment>
  )
}