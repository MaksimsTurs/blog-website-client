import scss from '../scss/galeryContent.module.scss'

import type { GaleryContentProps } from "../page.type";

import getExtension from '@/lib/get-extension/getExtention';

import { ArrowLeft } from 'lucide-react';

import useMetadata from '@/custom-hook/use-metadata/useMetadata';
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams';

import { URL_SEARCH_PARAMS } from '@/conts';

export default function GaleryContent({ galery, setCurrentSlide }: GaleryContentProps) {
  useMetadata({ title: galery?.title ? galery.title : 'Galery' })

  const searchParams = useSearchParams()

  const imageExtentions: string[] = ['webp', 'jpeg', 'png', 'jpg']
 
  const openSlideModal = (index: number): void => {
    setCurrentSlide(index)
  }

  const closeSelectedGalery = (): void => {
    searchParams.remove([URL_SEARCH_PARAMS['GALERY-ID']])
  }

  return(
    <div className={scss.galery_content_container}>
      <button onClick={closeSelectedGalery} className={`${scss.galery_content_close} flex-row-center-center-none`}><ArrowLeft /></button>
      {galery?.content.map((content, index) => (
        <div key={content.url} className={scss.galery_content_body} onClick={() => openSlideModal(index)}>
          {imageExtentions.includes(getExtension(content.url)) ? <img src={content.url}/> : <video src={content.url}/>}
        </div>
      ))}
    </div>
  )
}