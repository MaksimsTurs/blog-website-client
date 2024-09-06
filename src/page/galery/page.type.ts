import type { Galery } from "@/global.type"
import type { Dispatch, SetStateAction } from "react"

export type SlideModalProps = {
  galery: Galery
  currentSlide: number
  setCurrentSlide: Dispatch<SetStateAction<number | undefined>>
}

export type GaleryContentProps = {
  galery?: Galery
  setCurrentSlide: Dispatch<SetStateAction<number | undefined>>
}

export type InsertSlidesGaleryModal = {
  isUpdate?: boolean
  modalKey: string
}