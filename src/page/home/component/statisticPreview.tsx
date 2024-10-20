import scss from '../scss/statisticPreview.module.scss'
import '@/scss/global.scss'

import FetchDataComponent from '@/component/fetch-data-component/fetchDataComponent'
import PaginationList from "@/component/pagination-list/paginationList"
import PaginationListLoader from '@/component/pagination-list/component/paginationListLoader'
import StatisticPreviewLoader from './statisticPreviewLoader'
import ImageComponent from '@/component/image-component/image'
import XButton from '@/component/buttons/x-button/xbutton'

import { Link } from "react-router-dom"
import { Eye, Heart, MessageCircle } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime'

import type { GetPostStatistic, StatisticPreviewProps } from '../page.type'
import type { Content, KeyValueObject } from '@/global.type'

import fetcher from "@/lib/fetcher/fetcher"
import Strings from '@/lib/string/strings'
import Numbers from '@/lib/number/number'

import useRequest from '@/custom-hook/use-request/useRequest'
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'

import { URL_SEARCH_PARAMS } from '@/conts'

const statisticPreviewType: KeyValueObject<{ icon: JSX.Element, emptyText: string }> = { 
  views:    { icon: <Eye/>, emptyText: 'Nieman hat sich dieses Post angeschaut!' }, 
  likes:    { icon: <Heart/>, emptyText: 'Niemand hat dieses Post geliked!' }, 
  comments: { icon: <MessageCircle/>, emptyText: 'Niemand hat dieses Post kommentiert!' }
}

export default function StatisticPreview({ statisticToPreview }: StatisticPreviewProps) {
  const searchParams = useSearchParams()
  
  const postID: string = searchParams.get(URL_SEARCH_PARAMS['STATISTIC-PREVIEW-POST-ID'])!
  const currPage: number = parseInt(searchParams.get(URL_SEARCH_PARAMS['LIST-PAGE']) || '0')
  
  const { data, prev, isPending, error } = useRequest<GetPostStatistic>({ 
    deps: [`post/preview/${statisticToPreview}/${postID}/${currPage}`], 
    prev: [`post/preview/${statisticToPreview}/${postID}/${currPage === 0 ? 0 : currPage - 1}`], 
    request: async () => fetcher.get(`/post/preview/${statisticToPreview}/${postID}/${currPage}`),
  })

  const pagesCount: number = (prev?.pagesCount || data?.pagesCount) || 0

  const closePostStatisticModal = (): void => {
    searchParams.remove([URL_SEARCH_PARAMS['STATISTIC-TO-PREVIEW'], URL_SEARCH_PARAMS['STATISTIC-PREVIEW-POST-ID'], URL_SEARCH_PARAMS['LIST-PAGE']])
  }

  return(
    <section className={scss.preview_container}>
      <div className={`${scss.preview_body} main-content-container`}>
        <div className={`${scss.preview_header} flex-row-center-space-between-none`}>
          <div className='flex-row-center-normal-medium'>
            {statisticPreviewType[statisticToPreview].icon}
            <h4 className={scss.preview_type}>{Strings.firstLetterToUpperCase(statisticToPreview || '')}</h4>
          </div>
          <XButton onClick={closePostStatisticModal}/>
        </div>
        <div className='flex-column-normal-normal-small'>
          {isPending ? <PaginationListLoader/> : pagesCount > 1 ? <PaginationList pagesCount={pagesCount}/> : null}
          <FetchDataComponent
            useLocalErrorComponent
            isFetching={isPending}
            data={data?.items}
            emptyOptions={{ size: 'SMALL' }}
            emptyLabel={statisticPreviewType[statisticToPreview].emptyText}
            error={error}
            loaderComponent={<StatisticPreviewLoader/>}
            dataComponent={() =>(
              <Fragment>
                {data!.items!.map(item => (
                  <Link to={`/user/${item._id}`} className={`${scss.preview_item} flex-row-center-space-between-none`} key={Math.random() * 200}>
                    <div className='flex-row-center-normal-medium'>
                      <ImageComponent classNames={{ img: scss.preview_avatar, svg: scss.preview_avatar }} src={item.avatar} alt={item.name}/>
                      <p>{item?.name || (item as unknown  as Content).author?.name}</p>
                    </div>
                    {statisticToPreview === 'views' && <p className={`${scss.preview_item_count} flex-row-center-center-none`}>{Numbers.shortNum(item.count)}</p>}
                  </Link>))}            
              </Fragment>
            )}/>
        </div>
      </div>
    </section>
  )
}