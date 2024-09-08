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
import coockie from '@/lib/coockie/coockie'

import type { CustomInputsRef, Database } from '@/global.type'
import type { InsertItemFormProps } from '../page.type'
import type { FormFieldsValidation } from '@/custom-hook/use-form/useForm.type'

import { Fragment, SyntheticEvent, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const USE_FORM_VALIDATION: FormFieldsValidation<Database> = { title: { isMin: { message: 'Title is to short!', value: 4 }}}

export default function InsertItemForm({ setIsInsertMode }: InsertItemFormProps) {
  const [useUploadedImages, setUseUploadedImages] = useState<boolean>(false)
  
  const contentRef = useRef<CustomInputsRef<string>>()
  const uploadedAsset = useRef<CustomInputsRef<File>>()
  const { mutate, isMutating, error } = useMutate<Database[]>('database')
  const navigate = useNavigate()
  const ImageInput = useImageInput({})
  const isAdmin: boolean = usePermitor().role(['Admin']).permited()

  const { submit, reset, setError, register, formState: { errors }} = useForm(
    USE_FORM_VALIDATION, 
    undefined, 
    () => {
      contentRef.current?.clear()
      uploadedAsset.current?.clear()
      ImageInput.clear()
      navigate('/database')
      setIsInsertMode(false)
    }
  )

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

    const thumbnail = ImageInput.selected?.[0] ? ImageInput.selected?.[0] : uploadedAsset.current?.value

    if(!thumbnail) return setError('thumbnail', 'Thumbnail cann not be undefined!')
   
    mutate(async (option) => {
      const newItem = await fetcher.post<Database>('/insert/ruzzkyi-mir', createFormDataFromJSON({...data, content: contentRef.current?.value, thumbnail }), { 'Authorization': `${coockie.getOne('PR_TOKEN')}` })
      return [...option.state || [], newItem]
    })

    reset()
  }

  return(
    <Fragment>
      {isMutating && <MutatingLoader/>}
      <div className={`${scss.insert_item_form_container} flex-row-normal-center-none`}>
        <FormWrapper onSubmit={submit(insertItem)}>
          {useUploadedImages ? ImageInput.Component : <FileInput ref={uploadedAsset} name='thumbnail' label='Insert thumnbail'/>}
          <CheckBoxInput errors={errors} name='thumbnail' label='Use uploaded images' onInput={changeThumbnailSource}/>
          <TextInput register={register} name='title' placeholder='Item title' errors={errors}/>
          <TextArea ref={contentRef} placeholder='Wirte item content'/>
          <div style={{ width: '100%' }} className='flex-row-normal-normal-medium'>
            <Button label='Insert item' type='submit'/>
            <Button label='Back' onClick={goBack}/>
          </div>
          {error && <LocalError error={error.message}/>}
        </FormWrapper>
      </div>
    </Fragment>
  )
}