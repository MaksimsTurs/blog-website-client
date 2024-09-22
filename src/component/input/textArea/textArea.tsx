import scss from './textArea.module.scss'
import '@/scss/global.scss'

import type { TextAreaProps } from "../input.type";
import type { ServerResponseError } from '@/global.type';

import { Bold, Link2, FileImage, Eye, X, Heading1, Heading2 } from 'lucide-react';
import { forwardRef, Fragment, memo, SyntheticEvent, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

import TextInput from '../textInput/textInput';
import FileInput from '../fileInput/fileInput';
import MutatingLoader from '@/component/loader/mutatig-loader/mutatingLoader';
import ContentViewer from '@/component/content-viewer/contentViewer';
import LocalError from '@/component/errors/local-error/localError';
import Button from '@/component/buttons/button/button';
import XButton from '@/component/buttons/x-button/xbutton';

import useSearchParams from '@/custom-hook/use-search-params/useSearchParams';
import useOutsideClick from '@/custom-hook/use-outside-click/useOutsideClick';
import useImageInput from '../image-input/useImageInput';
import useSelect from '../select-input/useSelectItem';

import TextEditor from './text-editor/textEditor';

import Strings from '@/lib/string/strings';
import Array from '@/lib/array/array';

import { URL_SEARCH_PARAMS } from '@/conts';

export default memo(forwardRef(function({ placeholder, defaultValue }: TextAreaProps, ref) {
  const [textAreaContent, setTextAreaContent] = useState<string>(defaultValue)
  const [error, setError] = useState<string | undefined>()
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false)
  const [isUpload, setIsUpload] = useState<boolean>(false)
  const [imgAlt, setImgAlt] = useState<string>()
  const [imgUrl, setImgUrl] = useState<string>()
  const [context, setContext] = useState<string>()

  const asset = useRef<File>()
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const mainContainerRef = useRef<HTMLDivElement>(null)

  const isOpen = useOutsideClick(URL_SEARCH_PARAMS['IS-UPLOAD-MODAL-OPEN'], mainContainerRef)
  const ImageInput = useImageInput({})
  const ImageOptionInput = useSelect({ defaultValue: ['From url'] })
  
  const searchParams = useSearchParams()

  let initRender: boolean = true

  const bold = (): void => {
    const bolded: string = TextEditor.edit.wrapp(textAreaContent, textAreaRef.current!, 'BOLD')
    setTextAreaContent(bolded)
    TextEditor.shortCut.pushIntoHistory(bolded)
  }

  const headerOne = (): void => {
    const headered: string = TextEditor.edit.wrapp(textAreaContent, textAreaRef.current!, 'HEADER_1')
    setTextAreaContent(headered)
    TextEditor.shortCut.pushIntoHistory(headered)
  }

  const headerTwo = (): void => {
    const headered: string = TextEditor.edit.wrapp(textAreaContent, textAreaRef.current!, 'HEADER_2')
    setTextAreaContent(headered)
    TextEditor.shortCut.pushIntoHistory(headered)
  }

  const link = (): void => {
    const link: string = TextEditor.edit.wrapp(textAreaContent, textAreaRef.current!, 'LINK')
    setTextAreaContent(link)
    TextEditor.shortCut.pushIntoHistory(link)
  }

  const addAsset = useCallback(async(): Promise<void> => {
    const isVideo: boolean = !Array.include(
      ['webp', 'png', 'jpeg', 'jpg'], 
      [Strings.getAssetExtension(ImageInput.selected?.[0] || imgUrl || ''), asset.current?.type.replace(/image|video/, '').replace('/', '') || '']
    )

    const error = TextEditor.upload.validate({ 
      uploadType: ImageOptionInput.selected?.[0], 
      url: ImageInput.selected?.[0] || imgUrl, 
      alt: imgAlt, 
      asset: asset.current
    }, isVideo)
    
    setError(error)
    
    if(error) return
    
    let uploadedFileURL: string = imgUrl || ImageInput.selected?.[0] || ''

    if(ImageOptionInput.selected[0] === 'From file system') {
      try {
        setIsUpload(true)
        uploadedFileURL = (await TextEditor.upload.upload(asset.current!)).assetURL
      } catch(error) {
        setError((error as ServerResponseError).message)
        setIsUpload(false)
      }

      if(/video/g.test(asset.current?.type || '') || isVideo) {
        const fileText: string = TextEditor.edit.resource(uploadedFileURL, textAreaContent, textAreaRef.current!, 'VIDEO')
        setTextAreaContent(fileText)
      } else {
        const fileText: string = TextEditor.edit.resource(uploadedFileURL, textAreaContent, textAreaRef.current!, 'IMAGE', imgAlt!, context)
        setTextAreaContent(fileText)
      }

      setIsUpload(false)
      resetState(true, true)
      return 
    }

    if(isVideo) {
      const fileText: string = TextEditor.edit.resource(uploadedFileURL, textAreaContent, textAreaRef.current!, 'VIDEO')
      setTextAreaContent(fileText)
      resetState(true, true)
      return
    }

    const fileText: string = TextEditor.edit.resource(uploadedFileURL, textAreaContent, textAreaRef.current!, 'IMAGE', imgAlt!, context)
    setTextAreaContent(fileText)
    resetState(true, true)
  }, [imgAlt, imgUrl, asset, context, ImageOptionInput.selected, ImageInput.selected])

  const inputContent = (event: SyntheticEvent<HTMLTextAreaElement>): void => {
    setTextAreaContent(event.currentTarget.value)
    TextEditor.shortCut.pushIntoHistory(event.currentTarget.value)
  }

  const inputImgUrl = (event: SyntheticEvent<HTMLInputElement>): void => {
    setImgUrl(event.currentTarget.value)
  }

  const inputImgAlt = (event: SyntheticEvent<HTMLInputElement>): void => {
    setImgAlt(event.currentTarget.value)
  }

  const inputContext = (event: SyntheticEvent<HTMLInputElement>): void => {
    setContext(event.currentTarget.value)
  }

  const openImgModal = (): void => {
    searchParams.set({ [URL_SEARCH_PARAMS['IS-UPLOAD-MODAL-OPEN']]: true })
  }

  const closeUploadModal = (): void => {
    resetState(true, true)
  }

  const showCurrentContent = (): void => {
    setIsPreviewMode(prev => !prev)
  }

  const resetState = (closeModal?: boolean, resetAsset?: boolean): void => {
    setImgAlt(undefined)
    setContext(undefined)
    setImgUrl(undefined)
    setError(undefined)
    ImageInput.clear()
    ImageOptionInput.reset()

    if(closeModal) searchParams.remove([URL_SEARCH_PARAMS['IS-UPLOAD-MODAL-OPEN']])
    if(resetAsset) asset.current = undefined
  }

  useImperativeHandle(ref, () => ({
    clear: () => setTextAreaContent(''),
    value: textAreaContent
  }), [textAreaContent])

  useEffect(() => {
    if(initRender) {
      TextEditor.shortCut.pushIntoHistory(defaultValue || '')
      setTextAreaContent(defaultValue || '')
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
      {isUpload && <MutatingLoader/>}
      <section className={scss.text_area_action_buttons_container}>
        <button disabled={isPreviewMode} onClick={bold} type='button' className={`${scss.text_area_text_action} flex-row-center-center-none`}><Bold/></button>
        <button disabled={isPreviewMode} onClick={headerOne} type='button' className={`${scss.text_area_text_action} flex-row-center-center-none`}><Heading1/></button>
        <button disabled={isPreviewMode} onClick={headerTwo} type='button' className={`${scss.text_area_text_action} flex-row-center-center-none`}><Heading2/></button>
        <button disabled={isPreviewMode} onClick={link} type='button' className={`${scss.text_area_text_action} flex-row-center-center-none`}><Link2/></button>
        <button disabled={isPreviewMode} onClick={openImgModal} type='button' className={`${scss.text_area_text_action} flex-row-center-center-none`}><FileImage/></button>
        <button onClick={showCurrentContent} type='button' className={`${scss.text_area_text_action} flex-row-center-center-none`}><Eye/></button>
      </section>
      <div className={scss.text_area_container}>
        <div ref={mainContainerRef} className={isOpen ? `${scss.text_area_asset_modal_container} flex-row-center-center-none` : `${scss.text_area_asset_modal_container} ${scss.text_area_asset_modal_container_hidden} flex-row-center-center-none`}>
          <div className={`${scss.text_area_asset_modal_body} main-content-container flex-column-normal-normal-small`}>
            <div className={`${scss.text_area_asset_modal_header} flex-row-normal-space-between-medium`}>
              <p>Insert File</p>
              <XButton onClick={closeUploadModal}/>
            </div>
            <TextInput onInput={inputImgAlt} value={imgAlt || ''} name='' type='text' placeholder='Put img Alt attributte here!'/>
            <TextInput onInput={inputContext} value={context || ''} name='' type='text' placeholder='Put you context here!'/>
            {ImageOptionInput.selected.at(0) === 'Existet file from server' ? 
            ImageInput.Component :
            ImageOptionInput.selected.at(0) === 'From file system' ? 
            <FileInput label='Upload asset!' name='file' asset={asset} supportedFormats={['image/jpeg', 'video/mp4', 'image/jpg', 'image/png', 'image/webp']}/> :
            ImageOptionInput.selected.at(0) === 'From url' ? 
            <TextInput onInput={inputImgUrl} value={imgUrl || ''} name='' type='text' placeholder='Put you img URL here!'/> : null}
            <ImageOptionInput.Wrapper title='Add file option'>
              <ImageOptionInput.Item value='Existet file from server'>Existet file from server</ImageOptionInput.Item>
              <ImageOptionInput.Item value='From file system'>From file system</ImageOptionInput.Item>
              <ImageOptionInput.Item value='From url'>From url</ImageOptionInput.Item>
            </ImageOptionInput.Wrapper>
            {error && <LocalError error={error}/>}
            <Button label='Add Link' onClick={addAsset}/>
          </div>
        </div>
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
    </Fragment>
  ) 
}))