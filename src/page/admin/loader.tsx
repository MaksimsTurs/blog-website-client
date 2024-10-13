import scss from './loader.module.scss'
import '@/scss/global.scss'

import PaginationLoader from "@/component/pagination/component/paginationLoader";
import DataLoader from "./component/data-render/dataLoader";

export default function Loader() {
  return(
    <div style={{ width: '100%' }} className='flex-row-normal-normal-none'>
      <div style={{ paddingRight: '11rem', width: '100%' }} className='flex-column-normal-normal-medium'>
        <PaginationLoader/>
        <DataLoader/>
        <PaginationLoader/>
      </div>
      <div className={`${scss.side_menu_loader} flex-column-normal-normal-medium`}>
        <div style={{ width: '100%', height: '2rem' }} className={scss.side_menu_loader_animation}></div>
        <div style={{ width: '100%', height: '2rem' }} className={scss.side_menu_loader_animation}></div>
        <div style={{ width: '100%', height: '2rem' }} className={scss.side_menu_loader_animation}></div>
        <div style={{ width: '100%', height: '2rem' }} className={scss.side_menu_loader_animation}></div>
      </div>
    </div>
  )
}