import scss from './textArea.module.scss'
import '@/scss/global.scss'

import type { TextAreaProps } from "../input.type";
import type { KeyValueObject, ServerResponseError } from '@/global.type';

import { Bold, Link2, FileImage, Heading, Eye } from 'lucide-react';
import { Fragment, memo, SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';

import TextInput from '../textInput/textInput';
import FileInput from '../fileInput/fileInput';
import MutatingLoader from '@/component/loader/mutatig-loader/mutatingLoader';
import ModalError from '@/component/modal-error/modalError';
import ContentViewer from '@/component/content-viewer/contentViewer';

import areaValidation from './areaValidation';

import uploadAsset from './fetch/uploadAsset';

import useSearchParams from '@/custom-hook/use-search-params/useSearchParams';

import localStorage from '@/lib/local-storage/localStorage';
import countDuplicate from '@/lib/count-duplicate/countDuplicate';

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
      } catch(error) {
        setErrors({ 'upload-error': (errors as ServerResponseError).message })
        isUploading.current = false
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

  const stopAdding = (): void => {
    setImgAlt('')
    setImgUrl(undefined)
    setErrors({})
    searchParams.set({ 'is-open': false })
    asset.current = undefined
    
    if(getValue) getValue(textAreaContent)
  }

  const showCurrentContent = (): void => {
    if(isPreview) {
      localStorage.set('scroll-position', document.body.scrollTop)
      return searchParams.remove(['is-preview'])
    }

    document.body.scrollTo({ top: localStorage.get('scroll-position', '0') })
    return searchParams.set({ 'is-preview': true })
  }

  useEffect(() => {
    if(initRender) {
      setTextAreaContent(defaultValue || '')
      if(getValue) getValue(defaultValue || '')
    }
  }, [defaultValue])

  useEffect(() => {
    let shortCutPressedKeys: string[] = []

    let lineStart: number = 0
    let lineEnd: number = 0

    const shortCutMap: KeyValueObject = {
      'KeyL': function(event: KeyboardEvent) {
        event.preventDefault()
        const isMultiple: boolean = countDuplicate(shortCutPressedKeys, 'KeyL') > 1

        lineStart = textAreaRef.current!.selectionStart
        lineEnd = textAreaRef.current!.value.indexOf('\n', isMultiple ? textAreaRef.current!.selectionEnd : textAreaRef.current!.selectionStart)
    
        for(let index: number = lineStart; index >= 0; index--) {
          if(textAreaRef.current!.value[index] === '\n' || index === 0) {
            lineStart = index
            break
          }
        }

        if(isMultiple) {
          for(let index: number = lineEnd + 1; index < textAreaContent.length; index++) {
            if(textAreaRef.current!.value[index] === '\n' || index === textAreaContent.length) {
              lineEnd = index
              break
            }
          }
        }

        textAreaRef.current!.selectionStart = lineStart
        textAreaRef.current!.selectionEnd = lineEnd
      }
    }

    const keyUp = (event: KeyboardEvent): void => {
      if(event.code === 'ControlLeft') {
        shortCutPressedKeys = []
        lineStart = 0
        lineEnd = 0
      }
    }

    const keyDown = (event: KeyboardEvent): void => {
      if(event.ctrlKey && document.activeElement === textAreaRef.current) {
        if(shortCutMap?.[event.code]) {
          shortCutPressedKeys.push(event.code)
          shortCutMap[event.code](event)
        }
      }
    }

    document.addEventListener('keydown', keyDown)
    document.addEventListener('keyup', keyUp)
  }, [])

  return(
    <Fragment>
      {isUploading.current ? <MutatingLoader/> : null}
      <ModalError error={errors?.['upload-error']}/>
      <section className={scss.text_area_action_buttons_container}>
        <button disabled={isPreview} onClick={makeBold} type='button' className={`${scss.text_area_text_action} flex-row-center-center-none`}><Bold /></button>
        <button disabled={isPreview} onClick={makeHeader} type='button' className={`${scss.text_area_text_action} flex-row-center-center-none`}><Heading /></button>
        <button disabled={isPreview} onClick={addLink} type='button' className={`${scss.text_area_text_action} flex-row-center-center-none`}><Link2 /></button>
        <button disabled={isPreview} onClick={openImgModal} type='button' className={`${scss.text_area_text_action} flex-row-center-center-none`}><FileImage /></button>
        <button onClick={showCurrentContent} type='button' className={`${scss.text_area_text_action} flex-row-center-center-none`}><Eye /></button>
      </section>
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
        <div>
          {isPreview ? <ContentViewer content={textAreaContent}/> :
            <textarea 
              className={scss.text_area}
              placeholder={placeholder} 
              spellCheck={false}
              onChange={inputContent} 
              ref={textAreaRef} 
              value={textAreaContent} 
              rows={(textAreaContent?.split(/\n/)?.length || 0) + 1}></textarea>}
        </div>
      </div>
    </Fragment>
  ) 
})