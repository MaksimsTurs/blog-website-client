import scss from './image.module.scss'

import type { ImageCheckedUrlsMap, ImageComponentProps } from './image.type'

import { CircleUserRound } from 'lucide-react'
import { Fragment, memo, useEffect, useState } from 'react'

import ImageLoader from './imageLoader'

import localStorage from '@/lib/local-storage/localStorage'

let checkedUrls: ImageCheckedUrlsMap | null = localStorage.get<ImageCheckedUrlsMap>('checked-urls', 'null')

export default memo(function ImageComponent({ alt, classNames, src, styles }: ImageComponentProps) {
  const [imageState, setImageState] = useState<{ isLoading: boolean, source?: string }>({ isLoading: true })

  if(!checkedUrls) {
    checkedUrls = new Map()
    localStorage.set('checked-urls', Array.from(checkedUrls.entries()))
  } else {
    checkedUrls = new Map(checkedUrls)
  }
  
  useEffect(() => {
    const checkImageSource = async (): Promise<void> => {
      const response = await fetch(src || '')
      
      if(!response.ok) {
        checkedUrls?.set(src, undefined)
        localStorage.set('checked-urls', Array.from(checkedUrls?.entries() || []))
        setImageState({ isLoading: false })
        return
      }

      checkedUrls?.set(src, src)
      localStorage.set('checked-urls', Array.from(checkedUrls?.entries() || []))
      setImageState({ isLoading: false, source: src })
    }

    checkedUrls?.has(src) ?
      setImageState({ isLoading: false, source: checkedUrls.get(src) ? checkedUrls.get(src) : '' }) :
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