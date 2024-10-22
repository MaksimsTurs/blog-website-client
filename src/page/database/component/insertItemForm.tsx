import scss from '../scss/insertItemForm.module.scss'
import '@/scss/global.scss'

import FormWrapper from '@/component/form-wrapper/formWrapper'
import Button from '@/component/buttons/button/button'
import FileInput from '@/component/input/file-input/fileInput'
import TextArea from '@/component/input/textArea/textArea'
import TextInput from '@/component/input/text-input/textInput'
import CheckBoxInput from '@/component/input/checkbox-input/checkBoxInput'
import MutatingLoader from '@/component/loader/mutatig-loader/mutatingLoader'
import LocalError from '@/component/errors/local-error/localError'

import usePermitor from '@/custom-hook/use-permitor/useHavePermission'
import useMutate from '@/custom-hook/use-request/useMutate'
import useImageInput from '@/component/input/image-input/useImageInput'
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'

import fetcher from '@/lib/fetcher/fetcher'
import Objects from '@/lib/object/object'

import type { CustomInputsRef, Database } from '@/global.type'
import type { InsertItemFormProps } from '../page.type'

import { Fragment, SyntheticEvent, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { AUTHORIZATION_OBJECT, URL_SEARCH_PARAMS } from '@/conts'

export default function InsertItemForm({ isUpdate, item }: InsertItemFormProps) {
  const { handleSubmit, reset, register, formState: { errors }} = useForm()
  const { mutate, isMutating, error } = useMutate<Database[]>('database'),
        [useUploadedImages, setUseUploadedImages] = useState<boolean>(false),
        contentRef = useRef<CustomInputsRef<string>>(),
        searchParams = useSearchParams(),
        ImageInput = useImageInput({}),
        isAdmin: boolean = usePermitor().role(['Admin']).permited(),
        navigate = useNavigate()

  const changeThumbnailSource = (event: SyntheticEvent<HTMLInputElement>): void => {
    setUseUploadedImages(event.currentTarget.checked)
  }

  const goBack = (): void => {
    searchParams.remove([URL_SEARCH_PARAMS['IS-INSERT-DATABASE-MODE']])
    navigate('/database')
  }

  const insertItem = (data: any): void => {
    if(!isAdmin) return navigate('/')

    delete data.alt
    delete data.uploadImg
    delete data.url
    delete data.thumbnail

    const thumbnail = 
      ImageInput.selected?.[0] ? ImageInput.selected?.[0] : 
      data?.[`thumbnail-${isUpdate}`] ? Array.from(data?.[`thumbnail-${isUpdate}`])?.at(0) : 
      undefined

    mutate(async (option) => {
      const URL: string = isUpdate ? '/update/ruzzkyi-mir' : '/insert/ruzzkyi-mir'
      const newItem = await fetcher.post<Database>(URL, Objects.createFormDataFromJSON({...data, [`thumbnail-${isUpdate}`]: undefined, content: contentRef.current?.value, thumbnail }), AUTHORIZATION_OBJECT)
      
      navigate('/database')
      return [...option.state || [], newItem]
    })
    
    ImageInput.clear()
    searchParams.remove([URL_SEARCH_PARAMS['IS-INSERT-DATABASE-MODE']])
    reset()
  }

  return(
    <Fragment>
      {isMutating && <MutatingLoader/>}
      <div className={`${scss.insert_item_form_container} flex-row-normal-center-none`}>
        <FormWrapper onSubmit={handleSubmit(insertItem)}>
          {useUploadedImages ? ImageInput.Component : <FileInput register={register} name={`thumbnail-${isUpdate}`} type='file' label='Datenbank thumnbail'/>}
          <CheckBoxInput register={register} name='thumbnail' type='checkbox' errors={errors} label='Dateien aus dem server nutzten' onInput={changeThumbnailSource}/>
          <TextInput register={register} name='title' type='text' defaultValue={item?.content} placeholder='Datenbank title' errors={errors}/>
          <TextArea ref={contentRef} defaultValue={item?.content} placeholder='Schreib Datenbank content hier'/>
          <div style={{ width: '100%' }} className='flex-row-normal-normal-medium'>
            <Button className={scss.insert_form_button} type='submit'>Senden</Button>
            <Button className={scss.insert_form_button} onClick={goBack}>Zurück</Button>
          </div>
          {error && <LocalError error={error.message}/>}
        </FormWrapper>
      </div>
    </Fragment>
  )
}