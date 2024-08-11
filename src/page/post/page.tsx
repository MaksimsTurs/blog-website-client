import scss from './page.module.scss'
import '@/scss/global.scss'

import { useParams } from "react-router-dom"
import { Fragment } from 'react/jsx-runtime'

import type { Content } from "@/global.type"

import PostContainer from "@/component/post-container/postContainer"
import Error from "@/component/error/error"
// import CommentContainer from "./component/commentContainer"
import PreviewAuthorData from './component/previewAuthorData'
import PostContainerLoader from "@/component/loader/post-container-loader/postContainerLoader"
import PreviewAuthorDataLoader from './component/previewAuthorDataLoader'
import MutatingLoader from '@/component/loader/mutatig-loader/mutatingLoader'
import Empty from '@/component/empty/empty'

import fetcher from "@/lib/fetcher/fetcher"
import coockie from '@/lib/coockie/coockie'

import useRequest from '@/custom-hook/_use-request/useRequest'
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'
import useMetadata from '@/custom-hook/use-metadata/useMetadata'

import { URL_SEARCH_PARAMS } from '@/conts'

export default function Post() {
  const { id } = useParams()
  
  const searchParams = useSearchParams()

  const page: number = parseInt(searchParams.get(URL_SEARCH_PARAMS['PAGE']) || '0')
  
  const { data, isPending, isMutating, isFetching, error } = useRequest<Content>({ deps: [`post-${id}`], request: async () => fetcher.get<Content>(`/post/${id}`, { 'Authorization': `Bearer ${coockie.getOne('PR_TOKEN')}` }) })

  useMetadata({ title: data?.title, description: 'Hier kannst du vollständige version von gewählte post sehen und ihn kommentieren.' })
  
  return(
    <Fragment>
      {isMutating ? <MutatingLoader/> : null}
      {error ? <Error code={error.code} message={error.message}/> :
      <div className={`${scss.post_page_container} flex-row-normal-normal-medium`}>
        <div style={{ flexGrow: '1' }} className='flex-column-normal-normal-medium'> 
          <Fragment>
            {isPending ? <PostContainerLoader/> : <PostContainer post={data!} type="post"/>}
            <Empty option={{ height: 'FULL', flexCenterCenter: true }} label='Kommentar funktion ist zu zeit aus!'/>
            {/* <CommentContainer page={page} postID={id!} isPostHidden={data?.isHidden || false}/> */}
          </Fragment>
        </div>
        {isFetching ? <PreviewAuthorDataLoader/> : (data && data?.author) ? <PreviewAuthorData author={data!.author}/> : null}
      </div>}
    </Fragment>
  )
}