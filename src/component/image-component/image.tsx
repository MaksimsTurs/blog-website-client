import scss from './image.module.scss'

import type { ImageComponentProps } from './image.type'

import { CircleUserRound } from 'lucide-react'
import { Fragment, useEffect, useRef, useState } from 'react'

import ImageLoader from './imageLoader'

export default function ImageComponent({ alt, classNames, src, styles }: ImageComponentProps) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const imgSourceRef = useRef<string | undefined>('default')
  const imgRef = useRef<HTMLImageElement>(null)

  const isHTTPProtocol: boolean = (imgSourceRef.current?.search(/\http(s)/) || -1) > -1
  
  useEffect(() => {
    if(!imgRef.current) return
      
    imgRef.current.addEventListener('loadstart', () => {
      setIsLoaded(false)
    })

    imgRef.current.addEventListener('load', (event) => {
      const image = event.target as HTMLImageElement
      imgSourceRef.current = src
      setIsLoaded(image.complete)
    }, { once: true })

    imgRef.current.addEventListener('error', () => {
      imgSourceRef.current = undefined
      setIsLoaded(false)
    }, { once: true })
  }, [imgRef.current])

  console.log(isHTTPProtocol, isLoaded, imgSourceRef)

  return (
    <Fragment>
      {!isHTTPProtocol && !isLoaded ? <CircleUserRound className={`${classNames?.img} ${scss.default_image}`} size={40}/> : (!isLoaded && isHTTPProtocol) && <ImageLoader className={classNames?.loader} style={styles?.loader}/> }
      <img ref={imgRef} src={src} alt={alt} className={classNames?.img} style={{...styles?.img, display: (isHTTPProtocol ? imgSourceRef.current : undefined || isLoaded) ? 'block' : 'none' }}/>
    </Fragment>
  )
}