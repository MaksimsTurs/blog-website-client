import type { AppType } from "vite"

export const APP_TYPE: AppType = "spa"
export const ASSETS_INCLUDE_EXTENSTIONS: string[] = ['**/*.png', '**/*.webp', '**/*.jpg', '**/*.jpeg']

export const IMG_REGEXP: RegExp = /\.(jpeg|jpg|png|webp|gif)/i