import scss from '../scss/galeryContent.module.scss'
import '@/scss/global.scss'

import type { GaleryContentProps } from "../page.type";

import getExtension from '@/lib/get-extension/getExtention';

import { ArrowLeft, FileVideo, Image } from 'lucide-react';
import { useState } from 'react';

import useMetadata from '@/custom-hook/use-metadata/useMetadata';
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams';

import { URL_SEARCH_PARAMS } from '@/conts';

export default function GaleryContent({ galery, setCurrentSlide }: GaleryContentProps) {
  useMetadata({ title: galery?.title ? galery.title : 'Galery' })

  const [activeSort, setActiveSort] = useState<string[]>([])

  const searchParams = useSearchParams()

  const imageExtentions: string[] = ['webp', 'jpeg', 'png', 'jpg']
 
  const openSlideModal = (index: number): void => {
    setCurrentSlide(index)
  }

  const closeSelectedGalery = (): void => {
    searchParams.remove([URL_SEARCH_PARAMS['GALERY-ID']])
  }

  const insertSortParams = (param: string): void => {
    setActiveSort(prev => {
      if(prev.includes(param)) return prev.filter(sort => sort !== param)
      return [...prev, param]
    })
  }

  return(
    <div className='flex-column-normal-normal-none'>
      <div className={scss.galery_information_container}>
        <h4>{galery?.title}</h4>
        <div className='flex-row-center-normal-medium'>
          <div onClick={() => insertSortParams('image')} className={`${activeSort.includes('image') ? scss.galery_file_count_container_active : ''} ${scss.galery_file_count_container} flex-row-center-normal-medium`}>
            <Image size={25}/>
            <p>{galery?.countOfImg || 0}</p>
          </div>
          <div onClick={() => insertSortParams('video')} className={`${activeSort.includes('video') ? scss.galery_file_count_container_active : ''} ${scss.galery_file_count_container} flex-row-center-normal-medium`}>
            <FileVideo size={25}/>
            <p>{galery?.countOfVideos || 0}</p>
          </div>
        </div>
      </div>
      <div className={scss.galery_content_container}>
        <button onClick={closeSelectedGalery} className={`${scss.galery_content_close} flex-row-center-center-none`}><ArrowLeft /></button>
        {galery?.content.map((content, index) => {
          const extention: string = getExtension(content.url)

          if(activeSort.length === 2 || activeSort.length === 0) {
            return(
              <div key={content.url} className={scss.galery_content_body} onClick={() => openSlideModal(index)}>
                {imageExtentions.includes(extention) ? <img src={content.url}/> : <video src={content.url}/>}
              </div>
            )
          }
          
          if(activeSort.includes('image') && imageExtentions.includes(extention)) {
            return <div key={content.url} className={scss.galery_content_body} onClick={() => openSlideModal(index)}><img src={content.url}/></div>
          } else if(activeSort.includes('video') && (!extention || extention === 'mp4')) {
            return <div key={content.url} className={scss.galery_content_body} onClick={() => openSlideModal(index)}><video src={content.url}/></div>
          }
        })}
      </div>
    </div>
  )
}