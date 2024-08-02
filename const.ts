import type { AppType } from "vite"

export const APP_TYPE: AppType = "spa"
export const ASSETS_INCLUDE_EXTENSTIONS: string[] = ['**/*.png', '**/*.webp', '**/*.jpg', '**/*.jpeg']
export const DEV_FONT: string = 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Public+Sans:ital,wght@0,100..900;1,100..900&family=Roboto+Slab:wght@100..900&family=Sofia+Sans:ital,wght@0,1..1000;1,1..1000&display=swap'

export const IMG_REGEXP: RegExp = /\.(jpeg|jpg|png|webp|gif)/i