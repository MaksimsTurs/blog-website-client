import scss from './image.module.scss'

import type { ImageLoaderProps } from './image.type'

export default function ImageLoader({ className, style }: ImageLoaderProps) {
  return <div style={style} className={`${scss.default_image_loader} ${className}`}></div>
}