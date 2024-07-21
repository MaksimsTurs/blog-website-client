import scss from '../scss/paginationLoader.module.scss'
import '@/scss/global.scss'

export default function PaginationLoader() {
  return(
    <div className={`${scss.pagination_loader_container} flex-row-center-space-between-none`}>
      <div style={{ width: '4rem' }} className={scss.pagination_loader_button}></div>
      <div className='flex-row-normal-normal-medium'>
        <div className={scss.pagination_loader_button}></div>
        <div className={scss.pagination_loader_button}></div>
        <div className={scss.pagination_loader_button}></div>
        <div className={scss.pagination_loader_button}></div>
        <div className={scss.pagination_loader_button}></div>
      </div>
      <div style={{ width: '4rem' }} className={scss.pagination_loader_button}></div>
    </div>
  )
}