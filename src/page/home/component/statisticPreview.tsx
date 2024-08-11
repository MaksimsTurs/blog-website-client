import scss from '../scss/statisticPreview.module.scss'
import '@/scss/global.scss'

import Empty from '@/component/empty/empty'
import PaginationList from "@/component/pagination-list/paginationList"
import PaginationListLoader from '@/component/pagination-list/component/paginationListLoader'
import StatisticPreviewLoader from './statisticPreviewLoader'
import ImageComponent from '@/component/image-component/image'
import LocalError from '@/component/error/local-error/localError'

import { Link } from "react-router-dom"
import { X } from 'lucide-react'
import { Eye, Heart, MessageCircle } from 'lucide-react';

import type { GetPostStatistic, StatisticPreviewProps } from '../page.type'
import type { KeyValueObject } from '@/global.type'

import fetcher from "@/lib/fetcher/fetcher"
import formatNum from '@/lib/format-num/formatNum'
import firstLetterToUpperCase from "@/lib/first-letter-to-upper/firstLetterToUpper"

import useRequest from '@/custom-hook/_use-request/useRequest'
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'

import { URL_SEARCH_PARAMS } from '@/conts'

const iconDictionary: KeyValueObject = { views: <Eye/>, likes: <Heart/>, comments: <MessageCircle/> }
const emptyTextDictionary: KeyValueObject = { views: 'No body have viewed!', likes: 'No body have liked!', comments: 'No body have commented!' }

export default function StatisticPreview({ statisticToPreview }: StatisticPreviewProps) {
  const searchParams = useSearchParams()
  
  const postID: string = searchParams.get(URL_SEARCH_PARAMS['STATISTIC-PREVIEW-POST-ID'])!
  const currPage: number = parseInt(searchParams.get(URL_SEARCH_PARAMS['LIST-PAGE']) || '0')
  
  const { data, prev, isPending, error } = useRequest<GetPostStatistic>({ 
    deps: [`preview-${statisticToPreview}-${postID}-${currPage}`], 
    prev: [`preview-${statisticToPreview}-${postID}-${currPage === 0 ? 0 : currPage - 1}`], 
    request: async () => fetcher.get(`/post/preview/${statisticToPreview}/${postID}/${currPage}`),
  })

  const pagesCount: number = (prev?.pagesCount || data?.pagesCount) || 0

  const closePostStatisticModal = (): void => {
    searchParams.remove([URL_SEARCH_PARAMS['STATISTIC-TO-CHECK'], URL_SEARCH_PARAMS['STATISTIC-PREVIEW-POST-ID'], URL_SEARCH_PARAMS['LIST-PAGE']])
  }

  return(
    <section className={scss.preview_container}>
      <div className={`${scss.preview_body} main-content-container`}>
        <div className={`${scss.preview_header} flex-row-center-space-between-none`}>
          <div className='flex-row-center-normal-medium'>
            {iconDictionary[statisticToPreview]}
            <h4 className={scss.preview_type}>{firstLetterToUpperCase(statisticToPreview || '')}</h4>
          </div>
          <X onClick={closePostStatisticModal}/>
        </div>
        {isPending ? <PaginationListLoader/> : pagesCount > 1 ? <PaginationList pagesCount={pagesCount}/> : null}
        {isPending ? <StatisticPreviewLoader/> :
        <div style={{ paddingTop: pagesCount > 1 ? '0.5rem' : '0rem' }} className={scss.preview_item_count_list}>
          {error ? <LocalError error={error.message}/> :
          (data?.items?.length === 0 || !data) ? <Empty option={{ size: 'SMALL' }} label={emptyTextDictionary[statisticToPreview]}/> :
          data!.items!.map(item => (
            <Link to={`/user/${item._id}`} className={`${scss.preview_item} flex-row-center-space-between-none`} key={Math.random() * 200}>
              <div className='flex-row-center-normal-medium'>
                <ImageComponent src={item.avatar} alt={item.name}/>
                <p>{item.name}</p>
              </div>
              <p className={scss.preview_item_count}>{formatNum(item.count)}</p>
            </Link>
          ))}
        </div>}
      </div>
    </section>
  )
}