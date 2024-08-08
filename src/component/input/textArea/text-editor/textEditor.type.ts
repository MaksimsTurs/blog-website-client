import type { RefObject } from "react"

export type TextEditor = {
  shortCut: TextEditorShortCut
  edit: TextEditorEdit 
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
}

export type TextEditorWrappKeysEnum = 
  'BOLD' |
  'HEADER_1' |
  'HEADER_2' |
  'LINK'

export type TextEditorWrapperKeys = {
  [key in TextEditorWrappKeysEnum]: string
}