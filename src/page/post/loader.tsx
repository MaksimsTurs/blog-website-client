import '@/scss/global.scss'

import PaginationLoader from "@/component/pagination/component/paginationLoader";
import PostContainerLoader from "@/component/loader/post-container-loader/postContainerLoader";
import PreviewAuthorDataLoader from './component/previewAuthorDataLoader';

export default function Loader() {
  return(
    <div style={{ width: '100%' }} className='flex-row-normal-normal-medium'>
      <div style={{ width: '100%' }} className='flex-column-normal-normal-medium'>
        <PostContainerLoader/>
        <PaginationLoader/>
        <PostContainerLoader/>
        <PostContainerLoader/>
        <PaginationLoader/>
      </div>
      <PreviewAuthorDataLoader/>
    </div>
  )
}