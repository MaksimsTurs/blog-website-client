import scss from '../scss/databaseItem.module.scss'
import '@/scss/global.scss'

import { ChevronLeft, CircleX, Pencil } from 'lucide-react'
import { Fragment, SyntheticEvent, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import parse from '@/component/content-viewer/parser/parse'

import useRequest from '@/custom-hook/_use-request/_useRequest'
import useImageInput from '@/component/input/image-input/useImageInput'
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'
import usePermitor from '@/custom-hook/use-permitor/useHavePermission'
import useForm from '@/custom-hook/useForm/useForm'

import { URL_SEARCH_PARAMS } from '@/conts'

import type { DatabaseItemProps } from '../page.type'
import type { Database } from '@/global.type'

import ImageComponent from '@/component/image-component/image'
import Button from '@/component/button/button'
import FormWrapper from '@/component/form-wrapper/formWrapper'
import CheckBoxInput from '@/component/input/checkbox-input/checkBoxInput'
import TextArea from '@/component/input/textArea/textArea'
import TextInput from '@/component/input/textInput/textInput'
import MutatingLoader from '@/component/loader/mutatig-loader/mutatingLoader'
import FileInput from '@/component/input/fileInput/fileInput'

import coockie from '@/lib/coockie/coockie'
import createFormDataFromJSON from '@/lib/create-formdata-from-json/createFormDataFromJSON'
import fetcher from '@/lib/fetcher/fetcher'

export default function DatabaseItem({ item }: DatabaseItemProps) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [useUploadedImages, setUseUploadedImages] = useState<boolean>(false)

  const searchParams = useSearchParams()

  const { submit, reset, setError, formState: { errors }} = useForm([['title', 'isMin:5:Title is to short!']])
  const { mutate, isMutating, changeError } = useRequest({ deps: ['database'] })
  const ImageInput = useImageInput({ defaultValue: [item.thumbnail] })
  const isAdmin: boolean = usePermitor().role(['Admin']).permited()

  const navigate = useNavigate()

  const contentRef = useRef<string>('')

  const closeCurrentItem = (): void => {
    searchParams.remove([URL_SEARCH_PARAMS['DATABASE-ID']])
    setError('thumbnail')
  }

  const setEditMode = (): void => {
    setIsEditMode(prev => !prev)
    setError('thumbnail')
  }

  const getContent = (content: string): void => {
    contentRef.current = content
  }

  const changeThumbnailSource = (event: SyntheticEvent<HTMLInputElement>): void => {
    setUseUploadedImages(event.currentTarget.checked)
  }

  const goBack = (): void => {
    setIsEditMode(false)
    setError('thumbnail')
  }

  const updateItem = (data: any): void => {
    if(!isAdmin) return changeError(['database'], { code: 403, message: 'You have no permission!' })

    delete data.alt
    delete data.uploadImg
    delete data.url

    data.thumbnail = data?.thumbnail?.length === 0 ? data?.thumbnail?.[0] : ImageInput.selected?.[0]

    if(!data.thumbnail) return setError('thumbnail', 'Thumbnail cann not be undefined!')
    setError('thumbnail')

    mutate<Database[]>({
      key: ['database'],
      request: async (option) => {
        const newItem = await fetcher.post<Database>('/update/ruzzkyi-mir', createFormDataFromJSON({...data, _id: item._id, content: contentRef.current }), { 'Authorization': `${coockie.getOne('PR_TOKEN')}` })
        
        navigate('/database')
        setIsEditMode(false)
        ImageInput.clear()
        reset()
        return option.state!.map(item => item._id === newItem._id ? newItem : item)
      }
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
            {errors?.['thumbnail'] && <div className={`${scss.database_insert_item_form_error} flex-row-center-normal-medium`}><CircleX />{errors['thumbnail']}</div>}
            <CheckBoxInput name='' label='Use uploaded images' onInput={changeThumbnailSource}/>
            <TextInput name='title' placeholder='Item title' errors={errors} defaultValue={item.title}/>
            <TextArea getValue={getContent} placeholder='Wirte item content' defaultValue={item.content}/>
            <div style={{ width: '100%' }} className='flex-row-normal-normal-medium'>
              <Button label='Update item' type='submit'/>
              <Button label='Back' onClick={goBack}/>
            </div>
          </FormWrapper>
        </div>
      </Fragment> : 
      <Fragment>
        <div className={`${scss.database_item_header} flex-row-center-normal-medium`}>
          <div className='flex-column-normal-normal-small'>
            <p className={scss.database_item_header_title}>{item.title}</p>
            <div style={{ width: '100%' }} className='flex-row-normal-normal-small'>
              <Pencil onClick={setEditMode} className={scss.database_item_back_button}/>
              <ChevronLeft onClick={closeCurrentItem} className={scss.database_item_back_button}/>
            </div>
          </div>
        </div>
        <div className={scss.database_thumbnail_container}>
          <ImageComponent classNames={{ img: scss.database_thumbnail, svg: scss.database_loader_thumbnail, loader: scss.database_loader_thumbnail }} src={item.thumbnail} alt={item.title}/>
        </div>
        <div dangerouslySetInnerHTML={{ __html: parse(item.content) }}></div>
      </Fragment>}
    </div>
  )
}