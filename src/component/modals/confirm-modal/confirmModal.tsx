import scss from './confirmModal.module.scss'
import '@/scss/global.scss'

import XButton from '../../buttons/x-button/xbutton'
import Button from '../../buttons/button/button'

import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'
import useOutsideClick from '@/custom-hook/use-outside-click/useOutsideClick'

import { URL_SEARCH_PARAMS } from '@/conts'

import type { ConfirmModalProps } from './confirmModal.type'

import { useRef } from 'react'

export default function ConfirmModal({ text, onConfirm }: ConfirmModalProps) {
  const searchParams = useSearchParams()

  const modalContainerRef = useRef<HTMLDivElement>(null)

  const isOpen: boolean = useOutsideClick(URL_SEARCH_PARAMS['IS-CONFIRM-MODAL-OPEN'], modalContainerRef)

  const closeConfirmModal = (): void => {
    searchParams.remove([URL_SEARCH_PARAMS['IS-CONFIRM-MODAL-OPEN']])
  }

  return(
    <div ref={modalContainerRef} className={`${isOpen ? scss.confirm_modal_open : ''} ${scss.confirm_modal_container} flex-row-center-center-none`}>
      <div className={`${scss.confirm_modal_body} main-content-container`}>
        <section className={`${scss.confirm_modal_header} flex-row-center-space-between-medium`}>
          <p>Confirm</p>
          <XButton onClick={closeConfirmModal}/>
        </section>
        <div className={scss.confirm_modal_text_body}>
          <p>{text}</p>
          <div className='flex-row-center-center-none'>
            <Button label='Confirm' className={scss.confirm_modal_button} onClick={onConfirm}/>
          </div>
        </div>
      </div>
    </div>
  )
}