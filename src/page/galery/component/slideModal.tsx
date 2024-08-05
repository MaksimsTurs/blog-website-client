import scss from '../scss/slideModal.module.scss'

import useSearchParams from "@/custom-hook/use-search-params/useSearchParams";

import type { SlideModalProps } from "../page.type";

import getExtension from '@/lib/get-extension/getExtention'

import { ChevronLeft, ChevronRight, CircleAlert, X } from 'lucide-react'
import { Fragment } from 'react/jsx-runtime';

import { MODALS_KEYS } from "@/conts";

export default function SlideModal({ galery }: SlideModalProps) {
  const searchParams = useSearchParams()

  const currSlide: number = parseInt(searchParams.get(MODALS_KEYS['CURRENT-SLIDE']) || '0')
  const imageExtentions: string[] = ['webp', 'jpeg', 'png', 'jpg']

  const changeCurrSlide = (to: 'prev' | 'next'): void => {
    if(to === 'next') {
      if(currSlide + 1 < galery!.content.length) searchParams.set({ [MODALS_KEYS['CURRENT-SLIDE']]: currSlide + 1 })
    } else {
      if(currSlide - 1 >= 0) searchParams.set({ [MODALS_KEYS['CURRENT-SLIDE']]: currSlide - 1 })
    }
  }

  const closeSlidesModal = (): void => {
    searchParams.remove([MODALS_KEYS['CURRENT-SLIDE'], MODALS_KEYS['GALERY-ID']])
  }

  return(
    <div className={`${galery ? '' : scss.galery_current_galery_modal_container_hidden}  ${scss.galery_current_galery_modal_container} flex-row-center-center-none`}>
    <div className={`${scss.galery_current_galery_modal_body} flex-column-normal-normal-none main-content-container`}>
      <div className={`${scss.galery_modal_title} flex-row-normal-space-between-medium`}>
        <h4>{galery?.title}</h4>
        <X onClick={closeSlidesModal}/>
      </div>
      <div className={`${scss.galery_slides_container} flex-row-normal-norma-none`}>
        <div className={`${scss.galery_slide_buttons} flex-row-center-space-between-none`}>
          <button onClick={() => changeCurrSlide('prev')} className={`flex-row-center-center-none`}><ChevronLeft/></button>
          <button onClick={() => changeCurrSlide('next')} className={`flex-row-center-center-none`}><ChevronRight/></button>
        </div>
        {galery && galery.content.map((content, index) => (
          <div key={Math.random() * 9999} className={`${currSlide === index ? scss.galery_current_slide : ''} ${scss.galery_slides} flex-row-center-center-none`}>
            {imageExtentions.includes(getExtension(content.url)) ? <img src={content.url}/> : <video  controls src={content.url}/>}
            {content.description ? 
            <Fragment>
              <CircleAlert size={18} className={scss.galery_slide_context_warn}/>
              <p className={scss.galery_slide_context}>{content.description}</p> 
            </Fragment> : null}
          </div>))}
        </div>
      </div>
    </div>
  )
}