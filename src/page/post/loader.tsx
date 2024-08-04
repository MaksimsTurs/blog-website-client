import scss from './loader.module.scss'
import '@/scss/global.scss'

import PaginationLoader from "@/component/pagination/component/paginationLoader";
import PostContainerLoader from "@/component/loader/post-container-loader/postContainerLoader";
import PreviewAuthorDataLoader from './component/previewAuthorDataLoader';

export default function Loader() {
  return(
    <div className={`${scss.loader_container} flex-row-normal-normal-medium`}>
      <div className={`${scss.loader_body} flex-column-normal-normal-medium`}>
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