import scss from '../scss/databaseItem.module.scss'
import '@/scss/global.scss'

import { ChevronLeft, Pencil } from 'lucide-react'
import { Fragment, SyntheticEvent, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useImageInput from '@/component/input/image-input/useImageInput'
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'
import usePermitor from '@/custom-hook/use-permitor/useHavePermission'
import useForm from '@/custom-hook/use-form/useForm'
import useMutate from '@/custom-hook/use-request/useMutate'

import { AUTHORIZATION_OBJECT, URL_SEARCH_PARAMS } from '@/conts'

import type { FormFieldsValidation } from '@/custom-hook/use-form/useForm.type'
import type { DatabaseItemProps } from '../page.type'
import type { CustomInputsRef, Database } from '@/global.type'
import type { AsssetsState } from '@/component/input/file-input/fileInput.type'

import ImageComponent from '@/component/image-component/image'
import Button from '@/component/buttons/button/button'
import LocalError from '@/component/errors/local-error/localError'
import FormWrapper from '@/component/form-wrapper/formWrapper'
import CheckBoxInput from '@/component/input/checkbox-input/checkBoxInput'
import ContentViewer from '@/component/content-viewer/contentViewer'
import TextArea from '@/component/input/textArea/textArea'
import TextInput from '@/component/input/text-input/textInput'
import MutatingLoader from '@/component/loader/mutatig-loader/mutatingLoader'
import FileInput from '@/component/input/file-input/fileInput'

import fetcher from '@/lib/fetcher/fetcher'
import Objects from '@/lib/object/object'

const USE_FORM_VALIDATION: FormFieldsValidation<Database> = { title: { isMin: { message: 'Title is to short!', value: 4 }}}

export default function DatabaseItem({ item }: DatabaseItemProps) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false),
        [useUploadedImages, setUseUploadedImages] = useState<boolean>(false),
        searchParams = useSearchParams(),
        ImageInput = useImageInput({ defaultValue: [item.thumbnail] }),
        isAdmin: boolean = usePermitor().role(['Admin']).permited(),
        contentRef = useRef<CustomInputsRef<string>>(),
        customFileInputRef = useRef<CustomInputsRef<AsssetsState>>(),
        navigate = useNavigate()

  const { submit, reset, setError, register, formState: { errors }} = useForm(USE_FORM_VALIDATION, { title: item.title })
  const { mutate, isMutating, changeError, error } = useMutate<Database[]>('database')

  const closeCurrentItem = (): void => {
    searchParams.remove([URL_SEARCH_PARAMS['DATABASE-ID']])
    setError('thumbnail')
    setUseUploadedImages(false)
  }

  const setEditMode = (): void => {
    setIsEditMode(prev => !prev)
    setError('thumbnail')
    setUseUploadedImages(false)
  }

  const changeThumbnailSource = (event: SyntheticEvent<HTMLInputElement>): void => {
    setUseUploadedImages(event.currentTarget.checked)
  }

  const goBack = (): void => {
    setIsEditMode(false)
    setError('thumbnail')
  }

  const updateItem = (data: any): void => {
    if(!isAdmin) return changeError({ code: 403, message: 'You have no permission!' })

    delete data.alt
    delete data.uploadImg
    delete data.url

    const thumbnail: string | File | undefined = 
      ImageInput.selected?.[0] ? ImageInput.selected?.[0] : 
      customFileInputRef.current?.value.assets.at(0) ? customFileInputRef.current?.value.assets.at(0) : 
      undefined

    if(!thumbnail) return setError('thumbnail', 'Thumbnail cann not be undefined!')

    mutate(async (option) => {
      const newItem = await fetcher.post<Database>('/update/ruzzkyi-mir', Objects.createFormDataFromJSON({...data, _id: item._id, content: contentRef.current?.value, thumbnail }), AUTHORIZATION_OBJECT)
      
      navigate('/database')
      setIsEditMode(false)
      
      ImageInput.clear()
      contentRef.current?.clear()
      customFileInputRef.current?.clear()
      reset()
      
      return option.state!.map(item => item._id === newItem._id ? newItem : item)
    })
  }

  return(
    <div>
      {isEditMode ? 
      <Fragment>
        {isMutating && <MutatingLoader/>}
        <div className='flex-row-normal-center-none'>
          <FormWrapper onSubmit={submit(updateItem)} style={{ width: '60rem' }}>
            {useUploadedImages ? ImageInput.Component : <FileInput name='thumbnail' label='Insert thumnbail'/>}
            <CheckBoxInput errors={errors} name='thumbnail' label='Use uploaded images' onInput={changeThumbnailSource}/>
            <TextInput register={register} name='title' placeholder='Item title' errors={errors}/>
            <TextArea ref={contentRef} placeholder='Wirte item content' defaultValue={item.content}/>
            <div style={{ width: '100%' }} className='flex-row-normal-normal-medium'>
              <Button className={scss.database_form_button} type='submit'>Verändern</Button>
              <Button className={scss.database_form_button} onClick={goBack}>Zurück</Button>
            </div>
            {error && <LocalError error={error.message}/>}
          </FormWrapper>
        </div>
      </Fragment> : 
      <Fragment>
        <div className={`${scss.database_item_header} flex-row-center-normal-medium`}>
          <div className='flex-column-normal-normal-small'>
            <p className={scss.database_item_header_title}>{item.title}</p>
            <div style={{ width: '100%' }} className='flex-row-normal-normal-small'>
              {isAdmin && <Pencil onClick={setEditMode} className={scss.database_item_back_button}/>}
              <ChevronLeft onClick={closeCurrentItem} className={scss.database_item_back_button}/>
            </div>
          </div>
        </div>
        <div className={scss.database_thumbnail_container}>
          <ImageComponent classNames={{ img: scss.database_thumbnail, svg: scss.database_loader_thumbnail, loader: scss.database_loader_thumbnail }} src={item.thumbnail} alt={item.title}/>
        </div>
        <ContentViewer content={item.content}/>
      </Fragment>}
    </div>
  )
}