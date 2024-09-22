import scss from './image.module.scss'

import type { ImageComponentProps } from './image.type'

import { CircleUserRound } from 'lucide-react'
import { Fragment, memo, useEffect, useState } from 'react'

import ImageLoader from './imageLoader'

export default memo(function ImageComponent({ alt, classNames, src, styles }: ImageComponentProps) {
  const [imageState, setImageState] = useState<{ isLoading: boolean, source?: string }>({ isLoading: true })
  
  useEffect(() => {
    const checkImageSource = async (): Promise<void> => {
      const response = await fetch(src || '')

      if(!response.ok) {
        setImageState({ isLoading: false })
        return
      }

      setImageState({ isLoading: false, source: src })
    }

    checkImageSource()
  }, [])

  return (
    <Fragment>
      {imageState.isLoading ? 
      <ImageLoader className={classNames?.loader} style={styles?.loader}/> : 
      !imageState.source ? <CircleUserRound className={`${classNames?.svg} ${scss.default_image}`} style={styles?.svg}/> : null}
      <img src={src} alt={alt} className={classNames?.img} style={{...styles?.img, display: imageState.source && !imageState.isLoading ? 'block' : 'none' }}/>
    </Fragment>
  )
})