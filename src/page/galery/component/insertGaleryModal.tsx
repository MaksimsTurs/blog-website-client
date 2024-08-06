import scss from '../scss/insertGaleryModal.module.scss'
import '@/scss/global.scss'

import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'
import useForm from '@/custom-hook/useForm/useForm'

import { MODALS_KEYS } from '@/conts'

import { X } from 'lucide-react'

import FormWrapper from '@/component/form-wrapper/formWrapper'
import TextInput from '@/component/input/textInput/textInput'
import useOutsideClick from '@/custom-hook/use-outside-click/useOutsideClick'
import { useRef } from 'react'

export default function InsertGaleryModal() {
  const searchParams = useSearchParams()
  const { submit } = useForm([])

  const modalContainerRef = useRef<HTMLDivElement>(null)

  const isOpen: boolean = useOutsideClick(MODALS_KEYS['IS-ADD-GALERY-MODAL-OPEN'], modalContainerRef)

  const closeSlidesModal = (): void => {
    searchParams.remove([MODALS_KEYS['IS-ADD-GALERY-MODAL-OPEN']])
  }

  const insertGalery = (): void => {

  }

  return(
    <div ref={modalContainerRef} className={`${!isOpen ? scss.insert_modal_container_hidden : ''} ${scss.insert_modal_container} flex-row-center-center-none`}>
      <div className={`${scss.insert_modal_body} main-content-container`}>
      <div className={`${scss.galery_modal_title} flex-column-normal-space-between-medium`}>
        <div className={`${scss.insert_galery_modal_title} flex-row-center-space-between-medium`}>
          <h4>Insert new Galery</h4>
          <X onClick={closeSlidesModal}/>
        </div>
        <FormWrapper className={scss.insert_galery_form} onSubmit={submit(insertGalery)}>
          <TextInput name='title' placeholder='Title of Galery'/>
        </FormWrapper>
      </div>
      </div>
    </div>
  )
}