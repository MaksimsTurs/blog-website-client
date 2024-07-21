import scss from '../scss/statisticPreview.module.scss'
import '@/scss/global.scss'

import Empty from '@/component/empty/empty'
import PaginationList from "@/component/pagination-list/paginationList"
import PaginationListLoader from '@/component/pagination-list/component/paginationListLoader'
import StatisticPreviewLoader from './statisticPreviewLoader'
import ImageComponent from '@/component/image-component/image'

import { Link } from "react-router-dom"
import { X } from 'lucide-react'

import type { User } from "@/global.type"
import type { StatisticPreviewProps } from '../page.type'

import fetcher from "@/lib/fetcher/fetcher"
import firstLetterToUpperCase from "@/lib/first-letter-to-upper/firstLetterToUpper"

import useRequest from '@/custom-hook/_use-request/_useRequest'
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'

export default function StatisticPreview({ type }: StatisticPreviewProps) {
  const searchParams = useSearchParams()

  const postID: string = searchParams.get('post-id')!
  const currPage: number = parseInt(searchParams.get('list-page') || '0')

  const { data, prev, isPending } = useRequest<{ pagesCount: number, items: ({ count: number } & User)[] }>({ 
    deps: [`preview-${type}-${postID}-${currPage}`], 
    prev: [`preview-${type}-${postID}-${currPage - 1 < 0 ? 0 : currPage - 1}`], 
    request: async () => fetcher.get(`/post/preview/${type}/${postID}/${currPage}`),
  })

  const paginationLength: number = (prev?.pagesCount || data?.pagesCount) || 0

  const closePreviewStatistic = (): void => {
    searchParams.remove(['type', 'post-id', 'list-page'])
  }

  return(
    <section className={`${scss.preview_container} main-content-container`}>
      <div className={`${scss.preview_header} flex-row-center-space-between-none`}>
        <h4 className={scss.preview_type}>{firstLetterToUpperCase(type || '')}</h4>
        <X onClick={closePreviewStatistic}/>
      </div>
      {isPending ? <PaginationListLoader/> : paginationLength > 1 ? <PaginationList pagesCount={paginationLength}/> : null}
      {isPending ? <StatisticPreviewLoader/> :
      <div style={{ paddingTop: paginationLength > 1 ? '0.5rem' : '0rem' }} className={scss.preview_item_count_list}>
        {data?.items?.length === 0 ? <Empty label='Nothing found!'/> :
        data?.items?.map(item => (
          <Link to={`/user/${item._id}`} className='flex-row-center-space-between-none' key={Math.random() * 200}>
            <div className='flex-row-center-normal-medium'>
              <ImageComponent src={item.avatar} alt={item.name}/>
              <p>{item.name}</p>
            </div>
            <p className={scss.preview_item_count}>{item.count}</p>
          </Link>
        ))}
      </div>}
    </section>
  )
}