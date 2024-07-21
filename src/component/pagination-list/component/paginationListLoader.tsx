import scss from '../scss/paginationListLoader.module.scss'
import '@/scss/global.scss'

export default function PaginationListLoader() {
  return(
    <div className='flex-row-normal-space-between-medium'>
      <div className={scss.pagintion_list_button}></div>
      <div className='flex-row-normal-normal-small'>
        <div className={scss.pagintion_list_button}></div>
        <div className={scss.pagintion_list_button}></div>
        <div className={scss.pagintion_list_button}></div>
      </div>
      <div className={scss.pagintion_list_button}></div>
    </div>
  )
}