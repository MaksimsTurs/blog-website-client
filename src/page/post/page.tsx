import scss from './page.module.scss'
import '@/scss/global.scss'

import { useParams } from "react-router-dom"
import { Fragment } from 'react/jsx-runtime'

import type { Content } from "@/global.type"

// import CommentContainer from "./component/commentContainer"
import PostContainer from "@/component/post-container/postContainer"
import PageError from "@/component/errors/page-error/pageError"
import PreviewAuthorData from './component/previewAuthorData'
import PostContainerLoader from "@/component/loader/post-container-loader/postContainerLoader"
import PreviewAuthorDataLoader from './component/previewAuthorDataLoader'
import MutatingLoader from '@/component/loader/mutatig-loader/mutatingLoader'
import Empty from '@/component/empty/empty'

import fetcher from "@/lib/fetcher/fetcher"

// import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'
import useRequest from '@/custom-hook/use-request/useRequest'
import useMetadata from '@/custom-hook/use-metadata/useMetadata'

import { AUTHORIZATION_OBJECT } from '@/conts'

export default function Post() {
  const { id } = useParams()
  
  // const searchParams = useSearchParams()

  // const page: number = parseInt(searchParams.get(URL_SEARCH_PARAMS['PAGE']) || '0')
  
  const { data, isPending, isMutating, isFetching, error } = useRequest<Content>({ 
    deps: [`post-${id}`], 
    request: async () => fetcher.get<Content>(`/post/${id}`, AUTHORIZATION_OBJECT) 
  })

  useMetadata({ title: data?.title, description: 'Hier kannst du vollständige version von gewählte post sehen und ihn kommentieren.' })
  
  return(
    <Fragment>
      {isMutating ? <MutatingLoader/> : null}
      {error ? <PageError error={error}/> :
      <div className={`${scss.post_page_container} flex-row-normal-normal-medium`}>
        <div style={{ flexGrow: '1' }} className='flex-column-normal-normal-medium'> 
          <Fragment>
            {isPending ? <PostContainerLoader/> : !data ? <PageError error={{ code: 404, message: 'Post not found!' }}/> : <PostContainer post={data!} type="post"/>}
            <Empty option={{ height: 'FULL', flexCenterCenter: true }} label='Kommentar funktion ist zu zeit ausgeshaltet!'/>
            {/* <CommentContainer page={page} postID={id!} isPostHidden={data?.isHidden || false}/> */}
          </Fragment>
        </div>
        {isFetching ? <PreviewAuthorDataLoader/> : (data && data?.author) ? <PreviewAuthorData author={data!.author}/> : null}
      </div>}
    </Fragment>
  )
}