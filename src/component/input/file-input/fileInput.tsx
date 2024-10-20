import scss from './fileInput.module.scss'
import '@/scss/global.scss'

import { FileImage, X } from 'lucide-react'
import { type SyntheticEvent, CSSProperties, forwardRef, Fragment, useImperativeHandle, useState } from 'react'

import type { AsssetsState, FileInputProps } from './fileInput.type'

export default forwardRef(function ({ name, label, supportedFormats, className, isMultiple }: FileInputProps, ref) {
  const [uploadedAssets, setUploadedAssets] = useState<AsssetsState>({ assets: [], assetsSource: [] })

  const acceptedFormats: string = (supportedFormats || ['image/webp', 'image/jpg', 'image/png', 'image/jpeg', 'video/mp4']).join(','),
        singleModeLabelStyle: CSSProperties | undefined = isMultiple ? undefined : { width: 'fit-content' },
        singleModeImgContainerStyle: CSSProperties | undefined = isMultiple ? { position: 'relative' } : undefined

  const upload = (event: SyntheticEvent<HTMLInputElement>): void => {
    const files: File[] = Array.from(event.currentTarget.files || [])

    for(let index: number = 0; index < files.length; index++) {
      setUploadedAssets(prev => ({ assets: [...prev.assets, files[index]], assetsSource: [...prev.assetsSource, URL.createObjectURL(files[index])] }))
    }
  }

  const removeAsset = (src: string): void => {
    setUploadedAssets(prev => ({...prev, assetsSource: prev.assetsSource.filter(currSrc => src !== currSrc) }))
  }

  useImperativeHandle(ref, () => ({
    clear: () => setUploadedAssets({ assets: [], assetsSource: [] }),
    value: uploadedAssets
  }), [uploadedAssets])

  return(
    <Fragment>
      <input accept={acceptedFormats} id={name} name={name} multiple={isMultiple} type='file' onInput={upload}/>
      {uploadedAssets.assetsSource.length === 0 ? 
      <label style={singleModeLabelStyle} className={`${scss.file_input_label} ${className}`} htmlFor={name}>
        <section className={`${scss.file_input_text} flex-row-center-center-none`}><FileImage/><p>{label}</p></section>
      </label> :
      <div style={singleModeLabelStyle}  className={`${scss.file_uploaded_container} ${scss.file_input_label}`}>
        {isMultiple && 
        <label style={singleModeLabelStyle} className='flex-row-center-center-none' htmlFor={name}>
          <section className={`${scss.file_input_text} flex-row-center-center-none`}><FileImage/><p>{label}</p></section>
        </label>}
        {uploadedAssets.assetsSource.map(src => (
        <div style={singleModeImgContainerStyle} className={scss.file_uploaded_body} key={src}>
          <img className={scss.file_uploaded} src={src} alt="User uploaded avatar"/>
          <button className={`${scss.file_uploaded_button} flex-row-center-center-none`} type='button' onClick={() => removeAsset(src)}><X/></button>
        </div>))}        
      </div>}
    </Fragment>
  )
})