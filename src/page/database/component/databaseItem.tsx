import scss from '../scss/databaseItem.module.scss'
import '@/scss/global.scss'

import { ChevronLeft, Pencil } from 'lucide-react'
import { Fragment, useState } from 'react'

import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'
import usePermitor from '@/custom-hook/use-permitor/useHavePermission'

import { URL_SEARCH_PARAMS } from '@/conts'

import type { DatabaseItemProps } from '../page.type'

import ImageComponent from '@/component/image-component/image'
import ContentViewer from '@/component/content-viewer/contentViewer'

import InsertItemForm from './insertItemForm'

export default function DatabaseItem({ item }: DatabaseItemProps) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false),
        searchParams = useSearchParams(),
        isAdmin: boolean = usePermitor().role(['Admin']).permited()

  const closeCurrentItem = (): void => {
    searchParams.remove([URL_SEARCH_PARAMS['DATABASE-ID']])
  }

  const setEditMode = (): void => {
    setIsEditMode(prev => !prev)
  }

  return(
    <div>
      {isEditMode ? <InsertItemForm isUpdate item={item}/> :
      <Fragment>
        <div className={`${scss.database_item_header} flex-row-center-normal-medium`}>
          <div className='flex-column-normal-normal-small'>
            <p className={scss.database_item_header_title}>{item.title}</p>
            <div style={{ width: '100%' }} className='flex-row-normal-normal-small'>
              {isAdmin && <Pencil onClick={setEditMode} className={scss.database_item_back_button}/>}
              <ChevronLeft onClick={closeCurrentItem} className={scss.database_item_back_button}/>
            </div>
          </div>
        </div>
        <div className={scss.database_thumbnail_container}>
          <ImageComponent classNames={{ img: scss.database_thumbnail, svg: scss.database_loader_thumbnail, loader: scss.database_loader_thumbnail }} src={item.thumbnail} alt={item.title}/>
        </div>
        <ContentViewer content={item.content}/>
      </Fragment>}
    </div>
  )
}