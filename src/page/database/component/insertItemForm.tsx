import scss from '../scss/insertItemForm.module.scss'
import '@/scss/global.scss'

import FormWrapper from '@/component/form-wrapper/formWrapper'
import Button from '@/component/buttons/button/button'
import FileInput from '@/component/input/fileInput/fileInput'
import TextArea from '@/component/input/textArea/textArea'
import TextInput from '@/component/input/textInput/textInput'
import CheckBoxInput from '@/component/input/checkbox-input/checkBoxInput'
import MutatingLoader from '@/component/loader/mutatig-loader/mutatingLoader'
import LocalError from '@/component/errors/local-error/localError'

import useForm from '@/custom-hook/use-form/useForm'
import usePermitor from '@/custom-hook/use-permitor/useHavePermission'
import useMutate from '@/custom-hook/use-request/useMutate'
import useImageInput from '@/component/input/image-input/useImageInput'

import fetcher from '@/lib/fetcher/fetcher'
import createFormDataFromJSON from '@/lib/object/props/createFormDataFromJSON'

import type { CustomInputsRef, Database } from '@/global.type'
import type { InsertItemFormProps } from '../page.type'
import type { FormFieldsValidation } from '@/custom-hook/use-form/useForm.type'

import { Fragment, SyntheticEvent, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AUTHORIZATION_OBJECT } from '@/conts'

const USE_FORM_VALIDATION: FormFieldsValidation<Database> = { title: { isMin: { message: 'Title is to short!', value: 4 }}}

export default function InsertItemForm({ setIsInsertMode }: InsertItemFormProps) {
  const [useUploadedImages, setUseUploadedImages] = useState<boolean>(false)
  
  const contentRef = useRef<CustomInputsRef<string>>()

  const { submit, reset, setError, register, formState: { errors }} = useForm(USE_FORM_VALIDATION, undefined, () => contentRef.current?.clear())
  const { mutate, isMutating, error } = useMutate<Database[]>('database')
  const ImageInput = useImageInput({})
  const isAdmin: boolean = usePermitor().role(['Admin']).permited()

  const navigate = useNavigate()

  const changeThumbnailSource = (event: SyntheticEvent<HTMLInputElement>): void => {
    setUseUploadedImages(event.currentTarget.checked)
  }

  const goBack = (): void => {
    navigate('/database')
    setIsInsertMode(false)
  }

  const insertItem = (data: any): void => {
    if(!isAdmin) return navigate('/')

    delete data.alt
    delete data.uploadImg
    delete data.url
    delete data.thumbnail

    const thumbnail = ImageInput.selected?.[0] ? ImageInput.selected?.[0] : data?.thumbnail?.length > 0 ? data?.thumbnail : undefined

    if(!thumbnail) return setError('thumbnail', 'Thumbnail cann not be undefined!')
   
    mutate(async (option) => {
      const newItem = await fetcher.post<Database>('/insert/ruzzkyi-mir', createFormDataFromJSON({...data, content: contentRef.current?.value, thumbnail }), AUTHORIZATION_OBJECT)
      
      navigate('/database')
      return [...option.state || [], newItem]
    })
    
    ImageInput.clear()
    setIsInsertMode(false)
    reset()
  }

  return(
    <Fragment>
      {isMutating && <MutatingLoader/>}
      <div className={`${scss.insert_item_form_container} flex-row-normal-center-none`}>
        <FormWrapper onSubmit={submit(insertItem)}>
          {useUploadedImages ? ImageInput.Component : <FileInput register={register} name='thumbnail' label='Insert thumnbail'/>}
          <CheckBoxInput register={register} errors={errors} name='thumbnail' label='Use uploaded images' onInput={changeThumbnailSource}/>
          <TextInput register={register} name='title' placeholder='Item title' errors={errors}/>
          <TextArea ref={contentRef} placeholder='Wirte item content'/>
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