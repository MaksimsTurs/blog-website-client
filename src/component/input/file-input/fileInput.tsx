import scss from './fileInput.module.scss'
import '@/scss/global.scss'

import { FileImage, X } from 'lucide-react'
import { type SyntheticEvent, CSSProperties, Fragment, useEffect, useState } from 'react'

import type { FileInputProps, UploadedAssets } from './fileInput.type'
import type { FieldValues } from 'react-hook-form'

export default function FileInput<T extends FieldValues>({ name, label, assetsFormats, className, isMultiple, reset, register }: FileInputProps<T>) {
  const [uploadedAssets, setUploadedAssets] = useState<UploadedAssets[]>([])

  const acceptedFormats: string = (assetsFormats || ['image/webp', 'image/jpg', 'image/png', 'image/jpeg', 'video/mp4']).join(','),
        singleModeLabelStyle: CSSProperties | undefined = isMultiple ? undefined : { width: 'fit-content' },
        singleModeImgContainerStyle: CSSProperties | undefined = isMultiple ? { position: 'relative' } : undefined

  const upload = (event: SyntheticEvent<HTMLInputElement>): void => {
    const files: File[] = Array.from(event.currentTarget.files || [])

    for(let index: number = 0; index < files.length; index++) {
      if(acceptedFormats.includes(files[index].type)) setUploadedAssets(prev => [...prev, { src: URL.createObjectURL(files[index]), isVideo: /video/.test(files[index].type) }])
    }
  }

  const removeAsset = (src: string): void => {
    setUploadedAssets(prev => prev.filter(file => src !== file.src))
  }

  useEffect(() => {
    setUploadedAssets([])
  }, [reset])

  return(
    <Fragment>
      <input accept={acceptedFormats} id={name} multiple={isMultiple} onInput={upload} type='file' {...register?.(name)}/>
      {uploadedAssets.length === 0 ? 
      <label style={singleModeLabelStyle} className={`${scss.file_input_label} ${className}`} htmlFor={name}>
        <section className={`${scss.file_input_text} flex-row-center-center-none`}><FileImage/><p>{label}</p></section>
      </label> :
      <div style={singleModeLabelStyle}  className={`${scss.file_uploaded_container} ${scss.file_input_label}`}>
        {isMultiple && 
        <label style={singleModeLabelStyle} className='flex-row-center-center-none' htmlFor={name}>
          <section className={`${scss.file_input_text} flex-row-center-center-none`}><FileImage/><p>{label}</p></section>
        </label>}
        {uploadedAssets.map(file => (
        <div style={singleModeImgContainerStyle} className={scss.file_uploaded_body} key={file.src}>
          {file.isVideo ? <video className={scss.file_uploaded} controls={false} src={file.src}/> : <img className={scss.file_uploaded} src={file.src} alt="User uploaded avatar"/>}
          <button className={`${scss.file_uploaded_button} flex-row-center-center-none`} type='button' onClick={() => removeAsset(file.src)}><X/></button>
        </div>))}        
      </div>}
    </Fragment>
  )
}