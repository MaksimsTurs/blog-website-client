import scss from '../scss/insertSlidesGaleryModal.module.scss'
import '@/scss/global.scss'

import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'
import useMutate from '@/custom-hook/use-request/useMutate'

import FormWrapper from '@/component/form-wrapper/formWrapper'
import TextInput from '@/component/input/text-input/textInput'
import FileInput from '@/component/input/file-input/fileInput'
import LocalError from '@/component/errors/local-error/localError'
import Button from '@/component/buttons/button/button'
import ModalWrapper from '@/component/modals/modal-wrapper/modalWrapper'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'

import Objects from '@/lib/object/object'
import fetcher from '@/lib/fetcher/fetcher'

import { AUTHORIZATION_OBJECT, URL_SEARCH_PARAMS } from '@/conts'

import type { InsertSlidesGaleryModal } from '../page.type'
import type { Galery } from '@/global.type'

export default function InsertSlidesGaleryModal({ isUpdate, modalKey, title }: InsertSlidesGaleryModal) {
  const { mutate, changeError, error } = useMutate<Galery[]>('galery')
  const { handleSubmit, register, reset, setError, formState: { errors }} = useForm(),
        [countOfFiles, setCountOfFiles] = useState<number>(0),
        searchParams = useSearchParams()
  
  const incrementCount = (): void => {
    setCountOfFiles(prev => ++prev)
  }

  const resetAll = (): void => {
    setCountOfFiles(0)
    reset()
    changeError()
  }

  const insertOrUpdateGalery = (data: any): void => {
    const URL: string = !isUpdate ? '/insert/galery' : '/update/galery',
          dataEntries: [string, any][] = Object.entries(data)

    for(let [key, value] of dataEntries) {
      if(value instanceof FileList && Array.from(value).length === 0) return setError(key, { message: 'Du muss Datei uploaden!', type: 'required' })
    }

    mutate(async(option) => {
      const newOrUpdatedGalery = await fetcher.post<Galery>(URL, Objects.createFormDataFromJSON({...data, _id: searchParams.get(URL_SEARCH_PARAMS['GALERY-ID']) }), AUTHORIZATION_OBJECT),
            currState = option?.state || []
      
      if(isUpdate) return currState.map(galery => galery._id === newOrUpdatedGalery._id ? newOrUpdatedGalery : galery)
        
      return [...currState, newOrUpdatedGalery]
    })

    resetAll()  
  }

  return(
    <ModalWrapper modalKey={modalKey} title={title} onModalClose={resetAll}>
      <FormWrapper onSubmit={handleSubmit(insertOrUpdateGalery)} className={scss.insert_modal_container}>
        <TextInput 
          register={register} 
          name='title' 
          type='text'
          errors={errors} 
          validation={!isUpdate ? { required: 'Title ist erfordelich!', minLength: { value: 3, message: 'Title ist zu kurz!' }} : undefined}
          placeholder='Galerie title'/>
        <div className={`${scss.insert_modal_body} flex-row-center-normal-small`}>
          {[...Array(countOfFiles)].map((_, index) => (
            <div key={index} className={`${scss.insert_modal_input_container} flex-column-normal-normal-small`}>
              <TextInput register={register} name={`${index}-context`} type='text' placeholder='File context'/>
              <FileInput register={register} name={`${index}-file`} type='file' className={scss.insert_modal_file_input} label='Dateien uploaden'/>
              {errors?.[`${index}-file`] && <LocalError error={errors[`${index}-file`]?.message as string}/>}
            </div>
          ))}
        </div>
        {error && <LocalError error={error.message}/>}
        <div className={`${scss.insert_item_buttons_container} flex-row-center-normal-medium`}>
          <Button className={scss.insert_item_button} type='submit'>Senden</Button>
          <Button className={scss.insert_item_button} onClick={incrementCount}><Plus/></Button>
        </div>
      </FormWrapper>
    </ModalWrapper>
  )
}