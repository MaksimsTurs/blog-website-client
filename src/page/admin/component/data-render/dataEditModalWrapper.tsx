import scss from '../../scss/data-render/dataEditModalWrapper.module.scss'
import '@/scss/global.scss'

import type { PropsWithChildren } from "react";

import { X } from 'lucide-react';

import useSearchParams from '@/custom-hook/use-search-params/useSearchParams';

import { useParams } from 'react-router-dom';

import CharacterArray from '@/lib/string/string';

export default function DataEditModalWrapper({ children }: PropsWithChildren) {
  const searchParams = useSearchParams()
  const { tab } = useParams()

  const isOpen: boolean = JSON.parse(searchParams.get(`${tab}-edit-modal`) || 'false')

  const closeModal = (): void => {
    searchParams.remove([`${tab}-edit-modal`])
  }

  return(
    <div style={{ display: isOpen ? 'flex' : 'none' }} className={`${scss.data_edit_modal_wrapper} flex-row-center-center-none`}>
      <div className='main-content-container'>
        <div className={`${scss.data_edit_modal_header} flex-row-center-space-between-none`}>
          <p>Edit {CharacterArray.firstLetterToUpperCase(tab!)}</p>
          <X onClick={closeModal} size={17}/>
        </div>
        {children}
      </div>
    </div>
  )
}