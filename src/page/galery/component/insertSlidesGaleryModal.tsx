import scss from '../scss/insertSlidesGaleryModal.module.scss'
import '@/scss/global.scss'

import useForm from '@/custom-hook/use-form/useForm'
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'
import useMutate from '@/custom-hook/use-request/useMutate'

import FormWrapper from '@/component/form-wrapper/formWrapper'
import TextInput from '@/component/input/text-input/textInput'
import FileInput from '@/component/input/file-input/fileInput'
import ModalWrapper from '@/component/modals/modal-wrapper/modalWrapper'

import { useRef, useState } from 'react'
import { Plus } from 'lucide-react'

import Objects from '@/lib/object/object'
import fetcher from '@/lib/fetcher/fetcher'

import { AUTHORIZATION_OBJECT, URL_SEARCH_PARAMS } from '@/conts'

import type { InsertSlidesGaleryModal } from '../page.type'
import type { CustomInputsRef, Galery } from '@/global.type'
import type { AsssetsState } from '@/component/input/file-input/fileInput.type'

export default function InsertSlidesGaleryModal({ isUpdate, modalKey, title }: InsertSlidesGaleryModal) {
  const [countOfFiles, setCountOfFiles] = useState<number>(0),
        searchParams = useSearchParams(),
        customFileInputRef = useRef<CustomInputsRef<AsssetsState>>()

  const { submit, register, reset } = useForm()
  const { mutate } = useMutate<Galery[]>('galery')
  
  const incrementCount = (): void => {
    setCountOfFiles(prev => ++prev)
  }

  const insertOrUpdateGalery = (data: any): void => {
    const URL: string = !isUpdate ? '/insert/galery' : '/update/galery'
    
    mutate(async(option) => {
      const newOrUpdatedGalery = await fetcher.post<Galery>(URL, Objects.createFormDataFromJSON({
        ...data, 
        files: customFileInputRef.current?.value.assets,
        _id: searchParams.get(URL_SEARCH_PARAMS['GALERY-ID']) 
      }), AUTHORIZATION_OBJECT),
            currState = option?.state || []
      
      if(isUpdate) return currState.map(galery => galery._id === newOrUpdatedGalery._id ? newOrUpdatedGalery : galery)
        
      return [...currState, newOrUpdatedGalery]
    })

    customFileInputRef.current?.clear()
    reset()
  }

  const resetCountOfFiles = (): void => {
    setCountOfFiles(0)
  }

  return(
    <ModalWrapper modalKey={modalKey} title={title} onModalClose={resetCountOfFiles}>
      <FormWrapper onSubmit={submit(insertOrUpdateGalery)} className={scss.insert_modal_container} buttonLabel='Senden'>
        {!isUpdate && <TextInput name='title' register={register} placeholder='Galery title'/>}
        <div className={`${scss.insert_modal_body} flex-row-center-normal-small`}>
          {[...Array(countOfFiles)].map((_, index) => (
            <div key={index} className={`${scss.insert_modal_input_container} flex-column-normal-normal-small`}>
              <TextInput register={register} name={`${index}-context`} placeholder='File context'/>
              <FileInput ref={customFileInputRef} supportedFormats={['video/mp4', 'image/jpeg', 'image/jpg', 'image/png', 'image/webp']} className={scss.insert_modal_file_input} name={`${index}-file`} label='Select slide'/>
            </div>
          ))}
        </div>
        <button onClick={incrementCount} type='button' className={`${scss.insert_item_button} flex-row-center-center-none`}><Plus/></button>
      </FormWrapper>
    </ModalWrapper>
  )
}