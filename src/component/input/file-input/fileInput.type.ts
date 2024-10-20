export type FileInputProps = {
  name: string
  label: string
  className?: string
  supportedFormats?: AssetsFormats[] 
  isMultiple?: boolean
}

export type AsssetsState = {
  assets: File[]
  assetsSource: string[]
}

export type AssetsFormats = 'image/webp' | 'image/jpg' | 'image/png' | 'image/jpeg' | 'video/mp4'