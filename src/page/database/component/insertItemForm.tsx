import scss from '../scss/insertItemForm.module.scss'
import '@/scss/global.scss'

import FormWrapper from '@/component/form-wrapper/formWrapper'
import Button from '@/component/button/button'
import FileInput from '@/component/input/fileInput/fileInput'
import TextArea from '@/component/input/textArea/textArea'
import TextInput from '@/component/input/textInput/textInput'
import CheckBoxInput from '@/component/input/checkbox-input/checkBoxInput'
import MutatingLoader from '@/component/loader/mutatig-loader/mutatingLoader'

import useForm from '@/custom-hook/useForm/useForm'
import useRequest from '@/custom-hook/_use-request/_useRequest'
import usePermitor from '@/custom-hook/use-permitor/useHavePermission'
import useImageInput from '@/component/input/image-input/useImageInput'

import fetcher from '@/lib/fetcher/fetcher'
import createFormDataFromJSON from '@/lib/create-formdata-from-json/createFormDataFromJSON'
import coockie from '@/lib/coockie/coockie'

import type { Database } from '@/global.type'
import type { InsertItemFormProps } from '../page.type'

import { Fragment, SyntheticEvent, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CircleX } from 'lucide-react'

export default function InsertItemForm({ setIsInsertMode }: InsertItemFormProps) {
  const [useUploadedImages, setUseUploadedImages] = useState<boolean>(false)

  const { submit, reset, setError, formState: { errors }} = useForm([['title', 'isMin:5:Title is to short!']])
  const { mutate, isMutating, changeError } = useRequest({ deps: ['database'] })
  const ImageInput = useImageInput({})
  const isAdmin: boolean = usePermitor().role(['Admin']).permited()

  const navigate = useNavigate()

  const contentRef = useRef<string>('')
  const selectedRef = useRef<string | undefined>()

  const getContent = (content: string): void => {
    contentRef.current = content
  }

  const changeThumbnailSource = (event: SyntheticEvent<HTMLInputElement>): void => {
    setUseUploadedImages(event.currentTarget.checked)
  }

  const goBack = (): void => {
    navigate('/database')
    setIsInsertMode(false)
  }

  const insertItem = (data: any): void => {
    if(!isAdmin) return changeError(['database'], { code: 403, message: 'You have no permission!' })

    delete data.alt
    delete data.uploadImg
    delete data.url

    data.thumbnail = data?.thumbnail?.length === 0 ? data?.thumbnail?.[0] || selectedRef.current : undefined

    if(!data.thumbnail) return setError('thumbnail', 'Thumbnail cann not be undefined!')
    setError('thumbnail')
   
    mutate<Database[]>({
      key: ['database'],
      request: async (option) => {
        const newItem = await fetcher.post<Database>('/update/ruzzkyi-mir', createFormDataFromJSON({...data, content: contentRef.current }), { 'Authorization': `${coockie.getOne('PR_TOKEN')}` })
        
        navigate('/database')
        setIsInsertMode(false)
        return [...option.state || [], newItem]
      }
    })

    ImageInput.clear()
    reset()
  }

  return(
    <Fragment>
      {isMutating && <MutatingLoader/>}
      <div className={`${scss.insert_item_form_container} flex-row-normal-center-none`}>
        <FormWrapper onSubmit={submit(insertItem)}>
          {useUploadedImages ? ImageInput.Component : <FileInput name='thumbnail' label='Insert thumnbail'/>}
          {errors?.['thumbnail'] && <div className={`${scss.insert_item_form_error} flex-row-center-normal-medium`}><CircleX />{errors['thumbnail']}</div>}
          <CheckBoxInput name='' label='Use uploaded images' onInput={changeThumbnailSource}/>
          <TextInput name='title' placeholder='Item title' errors={errors}/>
          <TextArea getValue={getContent} placeholder='Wirte item content'/>
          <div style={{ width: '100%' }} className='flex-row-normal-normal-medium'>
            <Button label='Insert item' type='submit'/>
            <Button label='Back' onClick={goBack}/>
          </div>
        </FormWrapper>
      </div>
    </Fragment>
  )
}