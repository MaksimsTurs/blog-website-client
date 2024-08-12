import scss from '../scss/insertItemForm.module.scss'
import '@/scss/global.scss'

import FormWrapper from '@/component/form-wrapper/formWrapper'
import Button from '@/component/button/button'
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

import type { Database } from '@/global.type'
import type { InsertItemFormProps } from '../page.type'

import { Fragment, SyntheticEvent, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function InsertItemForm({ setIsInsertMode }: InsertItemFormProps) {
  const [useUploadedImages, setUseUploadedImages] = useState<boolean>(false)

  const { submit, reset, setError, formState: { errors }} = useForm([['title', 'isMin:4:Title is to short!']])
  const { mutate, isMutating, error } = useMutate<Database[]>('database')
  const ImageInput = useImageInput({})
  const isAdmin: boolean = usePermitor().role(['Admin']).permited()

  const navigate = useNavigate()

  const contentRef = useRef<string>('')

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
    if(!isAdmin) return navigate('/')

    delete data.alt
    delete data.uploadImg
    delete data.url
    delete data.thumbnail

    const thumbnail = ImageInput.selected?.[0] ? ImageInput.selected?.[0] : data?.thumbnail?.length > 0 ? data?.thumbnail : undefined

    if(!thumbnail) return setError('thumbnail', 'Thumbnail cann not be undefined!')
   
    mutate(async (option) => {
      const newItem = await fetcher.post<Database>('/insert/ruzzkyi-mir', createFormDataFromJSON({...data, content: contentRef.current, thumbnail }), { 'Authorization': `${coockie.getOne('PR_TOKEN')}` })
      
      navigate('/database')
      setIsInsertMode(false)
      ImageInput.clear()
      reset()
      return [...option.state || [], newItem]
    })
  }

  return(
    <Fragment>
      {isMutating && <MutatingLoader/>}
      <div className={`${scss.insert_item_form_container} flex-row-normal-center-none`}>
        <FormWrapper onSubmit={submit(insertItem)}>
          {useUploadedImages ? ImageInput.Component : <FileInput name='thumbnail' label='Insert thumnbail'/>}
          <CheckBoxInput errors={errors} name='thumbnail' label='Use uploaded images' onInput={changeThumbnailSource}/>
          <TextInput name='title' placeholder='Item title' errors={errors}/>
          <TextArea getValue={getContent} placeholder='Wirte item content'/>
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