import scss from '../scss/galeryContent.module.scss'

import type { GaleryContentProps } from "../page.type";

import getExtension from '@/lib/get-extension/getExtention';

import { ArrowLeft } from 'lucide-react';

export default function GaleryContent({ content, setCurrentSlide, setGaleryID }: GaleryContentProps) {
  const imageExtentions: string[] = ['webp', 'jpeg', 'png', 'jpg']
 
  const openSlideModal = (index: number): void => {
    setCurrentSlide(index)
  }

  const closeSelectedGalery = (): void => {
    setGaleryID(undefined)
  }

  return(
    <div className={scss.galery_content_container}>
      <button onClick={closeSelectedGalery} className={`${scss.galery_content_close} flex-row-center-center-none`}><ArrowLeft /></button>
      {content.map((content, index) => (
        <div key={content.url} className={scss.galery_content_body} onClick={() => openSlideModal(index)}>
          {imageExtentions.includes(getExtension(content.url)) ? <img src={content.url}/> : <video src={content.url}/>}
        </div>
      ))}
    </div>
  )
}