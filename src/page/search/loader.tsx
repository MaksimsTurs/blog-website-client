import scss from './loader.module.scss'

import PaginationLoader from '@/component/pagination/component/paginationLoader'
import PostContainerLoader from '@/component/loader/post-container-loader/postContainerLoader'

export default function SearchLaoder() {
  return(
    <div className={`${scss.search_loader_container} flex-row-normal-normal-medium`}>
      <div style={{ width: '100%' }} className='flex-column-normal-normal-small'>
        <PaginationLoader/>
        <PostContainerLoader/>
        <PostContainerLoader/>
        <PostContainerLoader/>
      </div>
      <div style={{ width: '20rem', height: 'fit-content' }} className='main-content-container flex-column-normal-normal-medium'>
      <div className='flex-row-normal-normal-medium'>
        <div style={{ width: '5rem' }} className={scss.search_loader_div}></div>
        <div style={{ width: '5rem' }} className={scss.search_loader_div}></div>
        <div style={{ width: '5rem' }} className={scss.search_loader_div}></div>
      </div>
      <div className='flex-column-normal-normal-medium'>
        <div style={{ width: '100%' }} className={scss.search_loader_div}></div>
        <div style={{ width: '100%' }} className={scss.search_loader_div}></div>
        <div style={{ width: '100%' }} className={scss.search_loader_div}></div>
        <div style={{ width: '100%' }} className={scss.search_loader_div}></div>
      </div>
      <div className='flex-row-normal-normal-medium'>
        <div style={{ width: '50%' }} className={scss.search_loader_div}></div>
        <div style={{ width: '50%' }} className={scss.search_loader_div}></div>
      </div>
      </div>
    </div>
  )
}