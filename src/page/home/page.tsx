import scss from './page.module.scss'
import '@/scss/global.scss'

import _PostContainer from "@/component/post-container/postContainer"
import Button from '@/component/buttons/button/button'
import FetchDataComponent from '@/component/fetch-data-component/fetchDataComponent'
import StatisticPreview from './component/statisticPreview'
import MutatingLoader from '@/component/loader/mutatig-loader/mutatingLoader'
import Loader from './loader'

import fetcher from "@/lib/fetcher/fetcher"

import type { Content } from "@/global.type"

import { Fragment, memo, useState } from 'react'

import useRequest from '@/custom-hook/use-request/useRequest'
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'

import { AUTHORIZATION_OBJECT, URL_SEARCH_PARAMS } from '@/conts'

const contentPerLoad: number = 10

const PostContainer = memo(_PostContainer)

export default function Page() {
  const [postCount, setPostCount] = useState<number>(10)

  const searchParams = useSearchParams()

  const statisticPreviewType: string | null = searchParams.get(URL_SEARCH_PARAMS['STATISTIC-TO-PREVIEW'])
  
  const { isFetching, isPending, data, error, request } = useRequest({ 
    deps: [`/${postCount}`],
    request: async () => await fetcher.get<Content[]>(`/home/${postCount}`, AUTHORIZATION_OBJECT) 
  })

  const loadMorePosts = async (): Promise<void> => {
    setPostCount(prev => prev + contentPerLoad)
    
    await request()
    
    if(!isFetching && !isPending) setTimeout(() => window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight }), 100)
  }

  return (
    <Fragment>
      {(isPending && data) && <MutatingLoader/>}
      <div className={`${scss.home_container} flex-row-normal-normal-medium`}>
        <div className={`${scss.home_container} flex-column-normal-normal-small`}>
          <FetchDataComponent 
            isFetching={isFetching}
            loaderComponent={<Loader/>} 
            error={error} 
            data={data}
            emptyLabel='Es wurde nichts gefunden!'
            dataComponent={() => (
              <Fragment>
                {data!.map(post => <PostContainer key={post._id} post={post} type="preview"/>)}
                {!(data!.length % 10) && <Button className={scss.home_load_more_posts_button} onClick={loadMorePosts}>Mehr Laden</Button>}
              </Fragment>
            )}/>
        </div>
        {statisticPreviewType && <StatisticPreview statisticToPreview={statisticPreviewType}/>}
      </div>
    </Fragment>
  )
}