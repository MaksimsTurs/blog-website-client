import scss from './image.module.scss'

import type { ImageComponentProps } from './image.type'

import { CircleUserRound } from 'lucide-react'
import { Fragment } from 'react'

import useCheckImageURL from '@/custom-hook/use-check-image-url/useCheckImageURL'

import ImageLoader from './imageLoader'

export default function ImageComponent({ alt, classNames, src, styles }: ImageComponentProps) {
  const { isLoading, imageSrc } = useCheckImageURL(src)

  return (
    <Fragment>
      {isLoading ? 
      <ImageLoader className={classNames?.loader} style={styles?.loader}/> : 
      !imageSrc ? <CircleUserRound className={`${classNames?.svg} ${scss.default_image}`} style={styles?.svg}/> : 
      <img src={src} alt={alt} className={classNames?.img} style={styles?.img}/>}
    </Fragment>
  )
}