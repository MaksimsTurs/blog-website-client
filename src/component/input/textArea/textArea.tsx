import scss from './textArea.module.scss'
import '@/scss/global.scss'

import type { TextAreaProps } from "../input.type";
import type { KeyValueObject, ServerResponseError } from '@/global.type';

import { Bold, Link2, FileImage, Eye, X, Heading1, Heading2 } from 'lucide-react';
import { Fragment, memo, SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';

import TextInput from '../textInput/textInput';
import FileInput from '../fileInput/fileInput';
import MutatingLoader from '@/component/loader/mutatig-loader/mutatingLoader';
import ModalError from '@/component/modal-error/modalError';
import ContentViewer from '@/component/content-viewer/contentViewer';

import areaValidation from './areaValidation';

import uploadAsset from './fetch/uploadAsset';

import useSearchParams from '@/custom-hook/use-search-params/useSearchParams';
import useOutsideClick from '@/custom-hook/use-outside-click/useOutsideClick';

import TextEditor from './text-editor/textEditor';

import { URL_SEARCH_PARAMS } from '@/conts';

export default memo(function({ placeholder, defaultValue, getValue }: TextAreaProps) {
  const [textAreaContent, setTextAreaContent] = useState<string>(defaultValue)
  const [errors, setErrors] = useState<KeyValueObject>()
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false)
  const [imgAlt, setImgAlt] = useState<string>()
  const [imgUrl, setImgUrl] = useState<string>()

  const asset = useRef<File>()
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const mainContainerRef = useRef<HTMLDivElement>(null)
  const isUploading = useRef<boolean>(false)
  const cursorPosition = useRef<number>(0)

  const isOpen = useOutsideClick(URL_SEARCH_PARAMS['IS-UPLOAD-MODAL-OPEN'], mainContainerRef)
  
  const searchParams = useSearchParams()

  let initRender: boolean = true

  const bold = (): void => {
    const bolded: string = TextEditor.edit.wrapp(textAreaContent, textAreaRef.current!, 'BOLD')
    setTextAreaContent(bolded)
    TextEditor.shortCut.pushIntoHistory(bolded)
    if(getValue) getValue(bolded)
  }

  const headerOne = (): void => {
    const headered: string = TextEditor.edit.wrapp(textAreaContent, textAreaRef.current!, 'HEADER_1')
    setTextAreaContent(headered)
    TextEditor.shortCut.pushIntoHistory(headered)
    if(getValue) getValue(headered)
  }

  const headerTwo = (): void => {
    const headered: string = TextEditor.edit.wrapp(textAreaContent, textAreaRef.current!, 'HEADER_2')
    setTextAreaContent(headered)
    TextEditor.shortCut.pushIntoHistory(headered)
    if(getValue) getValue(headered)
  }

  const link = (): void => {
    const link: string = TextEditor.edit.wrapp(textAreaContent, textAreaRef.current!, 'LINK')
    setTextAreaContent(link)
    TextEditor.shortCut.pushIntoHistory(link)
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
    searchParams.remove([URL_SEARCH_PARAMS['IS-UPLOAD-MODAL-OPEN']])
  }, [imgAlt, imgUrl, asset])

  const inputContent = (event: SyntheticEvent<HTMLTextAreaElement>): void => {
    cursorPosition.current = event.currentTarget.selectionEnd
    setTextAreaContent(event.currentTarget.value)
    TextEditor.shortCut.pushIntoHistory(event.currentTarget.value)
    if(getValue) getValue(event.currentTarget.value)
  }

  const inputImgUrl = (event: SyntheticEvent<HTMLInputElement>): void => {
    setImgUrl(event.currentTarget.value)
  }

  const inputImgAlt = (event: SyntheticEvent<HTMLInputElement>): void => {
    setImgAlt(event.currentTarget.value)
  }

  const openImgModal = (): void => {
    searchParams.set({ [URL_SEARCH_PARAMS['IS-UPLOAD-MODAL-OPEN']]: true })
  }

  const closeUploadModal = (): void => {
    setImgAlt('')
    setImgUrl(undefined)
    setErrors({})
    searchParams.remove([URL_SEARCH_PARAMS['IS-UPLOAD-MODAL-OPEN']])
    asset.current = undefined
    
    if(getValue) getValue(textAreaContent)
  }

  const showCurrentContent = (): void => {
    setIsPreviewMode(prev => !prev)
  }

  useEffect(() => {
    if(initRender) {
      TextEditor.shortCut.pushIntoHistory(defaultValue || '')
      setTextAreaContent(defaultValue || '')
      if(getValue) getValue(defaultValue || '')
    }
  }, [defaultValue])

  useEffect(() => {
    const keyUp = (event: KeyboardEvent): void => {
      if(event.code === 'ControlLeft') {
        TextEditor.shortCut.lineStart = 0
        TextEditor.shortCut.lineEnd = 0
        TextEditor.shortCut.shortCutPressedKeys = []
      }
    }

    const keyDown = (event: KeyboardEvent): void => {
      const code = event.code as keyof typeof TextEditor.shortCut

      if(event.ctrlKey && document.activeElement === textAreaRef.current) {
        TextEditor.shortCut.shortCutPressedKeys.push(code)

        if(code === 'KeyL') {
          TextEditor.shortCut.KeyL(event, textAreaRef)
        } else if(code === 'KeyZ') {
          setTextAreaContent(TextEditor.shortCut.KeyZ(event))
        } else if(code === 'KeyY') {
          setTextAreaContent(TextEditor.shortCut.KeyY(event))
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
        <button disabled={isPreviewMode} onClick={bold} type='button' className={`${scss.text_area_text_action} flex-row-center-center-none`}><Bold /></button>
        <button disabled={isPreviewMode} onClick={headerOne} type='button' className={`${scss.text_area_text_action} flex-row-center-center-none`}><Heading1/></button>
        <button disabled={isPreviewMode} onClick={headerTwo} type='button' className={`${scss.text_area_text_action} flex-row-center-center-none`}><Heading2/></button>
        <button disabled={isPreviewMode} onClick={link} type='button' className={`${scss.text_area_text_action} flex-row-center-center-none`}><Link2 /></button>
        <button disabled={isPreviewMode} onClick={openImgModal} type='button' className={`${scss.text_area_text_action} flex-row-center-center-none`}><FileImage /></button>
        <button onClick={showCurrentContent} type='button' className={`${scss.text_area_text_action} flex-row-center-center-none`}><Eye /></button>
      </section>
      <div className={scss.text_area_container}>
        <div ref={mainContainerRef} className={isOpen ? `${scss.text_area_asset_modal_container} flex-row-center-center-none` : `${scss.text_area_asset_modal_container} ${scss.text_area_asset_modal_container_hidden} flex-row-center-center-none`}>
          <div className={`${scss.text_area_asset_modal_body} main-content-container flex-column-normal-normal-small`}>
            <div className={`${scss.text_area_asset_modal_header} flex-row-normal-space-between-medium`}>
              <p>Upload File</p>
              <X onClick={closeUploadModal}/>
            </div>
            <TextInput errors={errors} onInput={inputImgUrl} defaultValue={imgUrl || ''} name='url' type='text' placeholder='Put you img URL here!'/>
            <TextInput errors={errors} onInput={inputImgAlt} defaultValue={imgAlt || ''} name='alt' type='text' placeholder='Put img Alt attributte here!'/>
            <FileInput label='Upload img!' name='uploadImg' asset={asset} initValue={imgUrl}/>
            <button disabled={isUploading.current} type='button' onClick={addImg}>Add Link</button>
          </div>
        </div>
        <div>
          {isPreviewMode ? <ContentViewer content={textAreaContent}/> :
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