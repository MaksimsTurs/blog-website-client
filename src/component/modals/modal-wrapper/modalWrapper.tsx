import scss from './modalWrapper.module.scss'
import '@/scss/global.scss'

import type { ModalWrapperProps } from "./modalWrapper.type";
import type { PropsWithChildren } from 'react'

import { useRef } from 'react';

import XButton from '@/component/buttons/x-button/xbutton';

import useSearchParams from '@/custom-hook/use-search-params/useSearchParams';
import useOutsideClick from '@/custom-hook/use-outside-click/useOutsideClick';

import { URL_SEARCH_PARAMS } from '@/conts';

export default function ModalWrapper({ modalKey, title, children, onModalClose }: PropsWithChildren<ModalWrapperProps>) {
  const searchParams = useSearchParams()

  const modalContainerRef = useRef<HTMLDivElement>(null)
  
  const isOpen: boolean = useOutsideClick(URL_SEARCH_PARAMS[modalKey as keyof typeof URL_SEARCH_PARAMS], modalContainerRef)
  
  const closeModal = (): void => {
    searchParams.remove([URL_SEARCH_PARAMS[modalKey as keyof typeof URL_SEARCH_PARAMS]])
    if(onModalClose) onModalClose()
  }

  return(
    <div ref={modalContainerRef} className={`${!isOpen ? scss.modal_wrapper_container_hidden : ''} ${scss.modal_wrapper_container} flex-row-center-center-none`}>
      <div className={`${!isOpen ? scss.modal_wrapper_body_hidden : ''} ${scss.modal_wrapper_body} main-content-container`}>
        <div className={`${scss.modal_wrapper_header} flex-row-center-space-between-big`}>
          <p>{title}</p>
          <XButton onClick={closeModal}/>
        </div>
        {children}
      </div>
    </div>
  )
}