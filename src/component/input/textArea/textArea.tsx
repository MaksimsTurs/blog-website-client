import scss from './textArea.module.scss'
import '@/scss/global.scss'

import type { TextAreaProps } from "../input.type";
import type { KeyValueObject, ServerResponseError } from '@/global.type';

import { Bold, Link2, FileImage, Heading, Eye } from 'lucide-react';
import { Fragment, memo, SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';

import TextInput from '../textInput/textInput';
import FileInput from '../fileInput/fileInput';
import MutatingLoader from '@/component/loader/mutatig-loader/mutatingLoader';
import ContentViewer from '@/component/content-viewer/contentViewer';
import ModalError from '@/component/modal-error/modalError';

import areaValidation from './areaValidation';

import uploadAsset from './fetch/uploadAsset';

import useSearchParams from '@/custom-hook/use-search-params/useSearchParams';

export default memo(function({ placeholder, defaultValue, getValue }: TextAreaProps) {
  const [textAreaContent, setTextAreaContent] = useState<string>(defaultValue)
  const [errors, setErrors] = useState<KeyValueObject>()

  const [imgAlt, setImgAlt] = useState<string>()
  const [imgUrl, setImgUrl] = useState<string>()

  const asset = useRef<File>()
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const isUploading = useRef<boolean>(false)
  const cursorPosition = useRef<number>(0)

  const searchParams = useSearchParams()

  const isOpen: boolean = JSON.parse(searchParams.get('is-open') || 'false')
  const isPreview: boolean = JSON.parse(searchParams.get('is-preview') || 'false')

  let initRender: boolean = true

  const makeBold = (): void => {
    const selectionStart: number = textAreaRef.current!.selectionStart
    const selectionEnd: number = textAreaRef.current!.selectionEnd

    cursorPosition.current = selectionEnd

    const contentSubstring = textAreaContent.substring(selectionStart, selectionEnd)
    const bolded = textAreaContent.replace(contentSubstring, `#${contentSubstring}#`)

    setTextAreaContent(bolded)

    if(getValue) getValue(bolded)
  }

  const makeHeader = (): void => {
    const selectionStart: number = textAreaRef.current!.selectionStart
    const selectionEnd: number = textAreaRef.current!.selectionEnd

    cursorPosition.current = selectionEnd

    const contentSubstring = textAreaContent.substring(selectionStart, selectionEnd)

    const header = textAreaContent.replace(contentSubstring, `##${contentSubstring}##`)

    setTextAreaContent(header)

    if(getValue) getValue(header)
  }

  const addLink = (): void => {
    const selection: number = textAreaRef.current!.selectionEnd

    cursorPosition.current = selection

    const link = `${textAreaContent.substring(0, selection)}[LINK STRING;LINK URL]${textAreaContent.substring(selection, textAreaContent.length)}`

    setTextAreaContent(link)

    if(getValue) getValue(link)
  }

  const addImg = useCallback(async(): Promise<void> => {
    const res: KeyValueObject = areaValidation({ alt: /video/g.test(asset.current?.type || '') ? 'placeholder' : imgAlt, url: imgUrl, asset: asset.current })
    const selection: number = textAreaRef.current!.selectionEnd

    cursorPosition.current = selection
    
    setErrors(res)

    if(Object.entries(res).filter(notUndefined => notUndefined).length > 0) return
    
    if(asset.current) {
      isUploading.current = true
      const uploadedAsset = new FormData()
      let uploadedURL
      uploadedAsset.append('file', asset.current)

      try {
        uploadedURL = await uploadAsset(uploadedAsset)
        console.log(uploadedURL.assetURL)
      } catch(error) {
        isUploading.current = false
        setErrors({ 'upload-error': (errors as ServerResponseError).message })
      }

      if(/video/g.test(asset.current?.type || '')) {
        const imgLink = `${textAreaContent.substring(0, selection)}[${uploadedURL!.assetURL}]${textAreaContent.substring(selection, textAreaContent.length)}`
        setTextAreaContent(imgLink)

        if(getValue) getValue(imgLink)
      } else {
        const imgLink = `${textAreaContent.substring(0, selection)}(${imgAlt};${uploadedURL!.assetURL})${textAreaContent.substring(selection, textAreaContent.length)}`
        setTextAreaContent(imgLink)
        
        if(getValue) getValue(imgLink)
      }
      
      isUploading.current = false
    } else {
      const imgLink = `${textAreaContent.substring(0, selection)}(${imgAlt};${imgUrl})${textAreaContent.substring(selection, textAreaContent.length)}`
      setTextAreaContent(imgLink)

      if(getValue) getValue(imgLink)
    }
  
    setImgAlt('')
    setImgUrl('')
    setErrors({})
    asset.current = undefined
    searchParams.set({ 'is-open': false })
  }, [imgAlt, imgUrl, asset])

  const inputContent = (event: SyntheticEvent<HTMLTextAreaElement>): void => {
    cursorPosition.current = event.currentTarget.selectionEnd
    setTextAreaContent(event.currentTarget.value)
    if(getValue) getValue(event.currentTarget.value)
  }

  const inputImgUrl = (event: SyntheticEvent<HTMLInputElement>): void => {
    setImgUrl(event.currentTarget.value)
  }

  const inputImgAlt = (event: SyntheticEvent<HTMLInputElement>): void => {
    setImgAlt(event.currentTarget.value)
  }

  const openImgModal = (): void => {
    searchParams.set({ 'is-open': true })
  }

  const previewContent = (): void => {
    const currPreviewState: boolean = JSON.parse(searchParams.get('is-preview') || 'false')
    searchParams.set({ 'is-preview': currPreviewState ? false : true })
  }

  const stopAdding = (): void => {
    setImgAlt('')
    setImgUrl(undefined)
    setErrors({})
    searchParams.set({ 'is-open': false })
    asset.current = undefined
    
    if(getValue) getValue('')
  }

  useEffect(() => {
    if(initRender) {
      setTextAreaContent(defaultValue || '')
      if(getValue) getValue(defaultValue || '')
    }
  }, [defaultValue])

  return(
    <Fragment>
      {isUploading.current ? <MutatingLoader/> : null}
      <ModalError error={errors?.['upload-error']}/>
      <div className={scss.text_area_container}>
        <div className={isOpen ? `${scss.text_area_asset_modal_container} flex-row-center-center-none` : `${scss.text_area_asset_modal_container} ${scss.text_area_asset_modal_container_hidden} flex-row-center-center-none`}>
          <div className={`${scss.text_area_asset_modal_body} main-content-container flex-column-normal-normal-small`}>
            <TextInput errors={errors} onInput={inputImgUrl} defaultValue={imgUrl || ''} name='url' type='text' placeholder='Put you img URL here!'/>
            <TextInput errors={errors} onInput={inputImgAlt} defaultValue={imgAlt || ''} name='alt' type='text' placeholder='Put img Alt attributte here!'/>
            <FileInput label='Upload img!' name='uploadImg' asset={asset} initValue={imgUrl}/>
            <button disabled={isUploading.current} type='button' onClick={addImg}>Add Link</button>
            <button type='button' onClick={stopAdding}>Stop</button>
          </div>
        </div>
        <section>
          <button disabled={isPreview} onClick={makeBold} type='button' className={`${scss.text_area_text_action} flex-row-center-center-none`}><Bold /></button>
          <button disabled={isPreview} onClick={makeHeader} type='button' className={`${scss.text_area_text_action} flex-row-center-center-none`}><Heading /></button>
          <button disabled={isPreview} onClick={addLink} type='button' className={`${scss.text_area_text_action} flex-row-center-center-none`}><Link2 /></button>
          <button disabled={isPreview} onClick={openImgModal} type='button' className={`${scss.text_area_text_action} flex-row-center-center-none`}><FileImage /></button>
          <button onClick={previewContent} type='button' className={`${scss.text_area_text_action} flex-row-center-center-none`}><Eye /></button>
        </section>
        {isPreview ? 
          <ContentViewer content={textAreaContent}/> : 
          <textarea 
            className={scss.text_area}
            placeholder={placeholder} 
            onChange={inputContent} 
            ref={textAreaRef} 
            value={textAreaContent} 
            rows={(textAreaContent?.split(/\n/)?.length || 0) + 1}></textarea>}
      </div>
    </Fragment>
  ) 
})