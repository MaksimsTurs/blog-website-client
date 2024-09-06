import '@/scss/global.scss'

import PostContainer from "@/component/post-container/postContainer"
import PageError from "@/component/errors/page-error/pageError"
import Empty from "@/component/empty/empty"
import Button from '@/component/buttons/button/button'
import StatisticPreview from './component/statisticPreview'
import MutatingLoader from '@/component/loader/mutatig-loader/mutatingLoader'
import LocalError from '@/component/errors/local-error/localError'
import Loader from './loader'

import fetcher from "@/lib/fetcher/fetcher"

import type { Content } from "@/global.type"

import { Fragment, useState } from 'react'

import useRequest from '@/custom-hook/use-request/useRequest'
import useMutate from '@/custom-hook/use-request/useMutate'
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'

import { AUTHORIZATION_OBJECT, URL_SEARCH_PARAMS } from '@/conts'

const contentPerLoad: number = 10

export default function Page() {
  const [postCount, setPostCount] = useState<number>(10)

  const searchParams = useSearchParams()

  const statisticPreviewType: string | null = searchParams.get(URL_SEARCH_PARAMS['STATISTIC-TO-PREVIEW'])
  
  const { mutate, ...otherMutateProps } = useMutate('all-posts')
  const { isFetching, isMutating, data, error } = useRequest({ 
    deps: ['all-posts'], 
    request: async () => await fetcher.get<Content[]>(`/home/${postCount}`, AUTHORIZATION_OBJECT) 
  })

  const loadMorePosts = async (): Promise<void> => {
    const nextLoadCount: number = postCount + contentPerLoad

    setPostCount(prev => prev + contentPerLoad)
    
    await mutate(async () => await fetcher.get<Content[]>(`/home/${nextLoadCount}`))
    
    if(!isFetching && !isMutating) setTimeout(() => window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight }), 100)
  }

  return (
    <Fragment>
      {isMutating && <MutatingLoader/>}
      <div style={{ height: '100%' }} className='flex-row-normal-normal-medium'>
        <div style={{ flexGrow: 1 }} className='flex-column-normal-normal-small'>
          {isFetching ? <Loader/> : 
          error ? <PageError error={error}/> :
          data && data.length === 0 ? <Empty option={{ flexCenterCenter: true }} label="Nothing found!"/> : 
          data && 
          <Fragment>
            {data.map(post => <PostContainer key={post._id} post={post} type="preview"/>)}
            {otherMutateProps.error && <LocalError error={otherMutateProps.error.message}/>}
            {data.length % 10 === 0 ? <div className='flex-row-center-center-none'><Button onClick={loadMorePosts} label='Load More'/></div> : null}
          </Fragment>}
        </div>
        {/* {statisticPreviewType && <StatisticPreview statisticToPreview={statisticPreviewType}/>} */}
      </div>
    </Fragment>
  )
}