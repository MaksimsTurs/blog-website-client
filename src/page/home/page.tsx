import '@/scss/global.scss'

import PostContainer from "@/component/post-container/postContainer"
import Error from "@/component/error/error"
import Empty from "@/component/empty/empty"
import Button from '@/component/button/button'
import StatisticPreview from './component/statisticPreview'
import MutatingLoader from '@/component/loader/mutatig-loader/mutatingLoader'
import Loader from './loader'

import fetcher from "@/lib/fetcher/fetcher"
import coockie from '@/lib/coockie/coockie'

import type { Content } from "@/global.type"

import { Fragment } from 'react'

import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'
import useRequest from '@/custom-hook/_use-request/_useRequest'

const contentPerLoad: number = 10
const is830px: boolean = window.matchMedia('(width <= 830px)').matches

export default function Page() {
  const searchParams = useSearchParams()
  
  const postsCount: number = parseInt(searchParams.get('posts-count') || String(contentPerLoad))
  const postStatisticPreviewType: string | null = searchParams.get('type')
  
  const { isFetching, isMutating, data, error, mutate } = useRequest({ 
    deps: ['all-posts'], 
    request: async () => await fetcher.get<Content[]>(`/home/${postsCount}`, { 'Authorization': `Bearer ${coockie.getOne('PR_TOKEN')}` }) 
  })

  const loadMorePosts = async (): Promise<void> => {
    const nextLoadCount: number = postsCount + contentPerLoad

    searchParams.set({ 'posts-count': nextLoadCount })
    await mutate({ key: ['all-posts'], request: async () => await fetcher.get<Content[]>(`/home/${nextLoadCount}`) })
    
    if(!isFetching && !isMutating) setTimeout(() => window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight }), 100)
  }

  return (
    <Fragment>
      {isMutating ? <MutatingLoader/> : null}
      <div style={{ height: '100%', marginRight: is830px ? '0rem' : postStatisticPreviewType ? '17rem' : '0rem' }} className='flex-row-normal-normal-medium'>
        <div style={{ flexGrow: 1 }} className='flex-column-normal-normal-small'>
          {isFetching ? <Loader/> : 
          error ? <Error underText='Go back or reload the page!' code={error.code} message={error.message}/> :
          data && data.length === 0 ? <Empty option={{ flexCenterCenter: true }} label="No post would founded!"/> : 
          data && 
          <Fragment>
            {data.map(post => <PostContainer key={post._id} post={post} type="preview"/>)}
            {data.length % contentPerLoad === 0 ? <div className='flex-row-center-center-none'><Button onClick={loadMorePosts} label='Load More'/></div> : null}
          </Fragment>}
        </div>
        {postStatisticPreviewType && <StatisticPreview type={postStatisticPreviewType}/>}
      </div>
    </Fragment>
  )
}