import type { FieldValues } from "react-hook-form"
import type { InputAttributes } from "../input.type"

export type FileInputProps<T extends FieldValues> = {
  label: string
  assetsFormats?: AssetsFormats[]
  isMultiple?: boolean
  reset?: boolean
} & Omit<InputAttributes<T>, 'placeholder' | 'disabled' | 'defaultValue' | 'errors' | 'validation'>

export type UploadedAssets = { src: string, isVideo?: boolean }

export type AssetsFormats = 'image/webp' | 'image/jpg' | 'image/png' | 'image/jpeg' | 'video/mp4'