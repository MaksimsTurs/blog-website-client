import scss from '../scss/slideModal.module.scss'

import type { SlideModalProps } from "../page.type";

import getExtension from '@/lib/get-extension/getExtention'

import { ChevronLeft, ChevronRight, CircleAlert, X } from 'lucide-react'
import useMetadata from '@/custom-hook/use-metadata/useMetadata';

export default function SlideModal({ galery, currentSlide, setCurrentSlide }: SlideModalProps) {
  useMetadata({ title: galery.title ? galery.title : 'Galery' })

  const imageExtentions: string[] = ['webp', 'jpeg', 'png', 'jpg']

  const changeCurrSlide = (to: 'prev' | 'next'): void => {
    if(to === 'next') {
      if(currentSlide + 1 < galery!.content.length) setCurrentSlide(prev => prev! + 1)
    } else {
      if(currentSlide > 0) setCurrentSlide(prev => prev! - 1)
    }
  }

  const closeSlidesModal = (): void => {
    setCurrentSlide(undefined)
  }

  return(
    <div className={`${galery ? '' : scss.galery_current_galery_modal_container_hidden}  ${scss.galery_current_galery_modal_container} flex-row-center-center-none`}>
    <div className={`${scss.galery_current_galery_modal_body} flex-column-normal-normal-none main-content-container`}>
      <div className={`${scss.galery_modal_title} flex-row-normal-space-between-medium`}>
        <h4>{currentSlide + 1}/{galery.content.length}</h4>
        <X onClick={closeSlidesModal}/>
      </div>
      <div className={`${scss.galery_slides_container} flex-row-normal-norma-none`}>
        <div className={`${scss.galery_slide_buttons} flex-row-center-space-between-none`}>
          <button onClick={() => changeCurrSlide('prev')} className={`flex-row-center-center-none`}><ChevronLeft/></button>
          <button onClick={() => changeCurrSlide('next')} className={`flex-row-center-center-none`}><ChevronRight/></button>
        </div>
        {galery && galery.content.map((content, index) => (
          <div key={Math.random() * 9999} className={`${currentSlide === index ? scss.galery_current_slide : ''} ${scss.galery_slides} flex-row-center-center-none`}>
            {imageExtentions.includes(getExtension(content.url)) ? <img src={content.url}/> : <video  controls src={content.url}/>}
            {content.description ? 
            <div className={`${scss.galery_slide_context_container} flex-row-normal-normal-medium`}>
              <CircleAlert size={18} className={scss.galery_slide_context_warn}/>
              <p className={scss.galery_slide_context}>{content.description}</p> 
            </div> : null}
          </div>))}
        </div>
      </div>
    </div>
  )
}