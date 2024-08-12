import type { RefObject } from "react"

export type TextEditor = {
  shortCut: TextEditorShortCut
  edit: TextEditorEdit
  upload: TextEditorUpload
}

export type TextEditorToValidate = {
  alt?: string
  url?: string
  asset?: File
  uploadType?: 'Existet file from server' | 'From file system' | 'From url' | (string & {})
}

export type TextEditorUpload = {
  upload: (file: File) => Promise<{ assetURL: string }>
  validate: (toValidate: TextEditorToValidate, isVideo: boolean) => string | undefined
}

export type TextEditorShortCut = {
  lineStart: number
  lineEnd: number
  shortCutPressedKeys: string[]
  history: string[]
  currentHistory: number
  pushIntoHistory: (content: string) => void
  KeyZ: (event: KeyboardEvent) => string
  KeyL: (event: KeyboardEvent, textAreaRef: RefObject<HTMLTextAreaElement>) => void
  KeyY: (event: KeyboardEvent) => string
}

export type TextEditorEdit = {
  wrappKeys: TextEditorWrapperKeys
  wrapp: (content: string, textArea: HTMLTextAreaElement, to: TextEditorWrappKeysEnum) => string
  resource: (url: string, content: string, textArea: HTMLTextAreaElement, to: 'IMAGE' | 'VIDEO', alt?: string, context?: string) => string
}

export type TextEditorWrappKeysEnum = 
  'BOLD' |
  'HEADER_1' |
  'HEADER_2' |
  'LINK'
  
export type TextEditorWrapperKeys = {
  [key in TextEditorWrappKeysEnum]: string
}