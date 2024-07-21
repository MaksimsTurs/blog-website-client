export type ContentParser = {
  regexp: ContentRegexp
  kind: ContentTypesKeyValue
  is: ContentIs
  have: LineHave
  parseAs: ContentParserParseLineAs
}

export type ContentRegexp = {
  BOLD_REGEXP: RegExp 
  HEADER_REGEXP: RegExp 
  IMAGE_REGEXP: RegExp 
  LINK_REGEXP: RegExp
  VIDEO_REGEXP: RegExp
  DEFAULT_REGEXP: RegExp
  SECURE_PROTOCOL_REGEXP: RegExp
  SQUARE_BRACKETS_REGEXP: RegExp
  PAIR_BRACKETS_REGEXP: RegExp
}

export type ContentIs = {
  secureLink: (url: string) => boolean
}

export type LineHave = {
  link: (line: string) => boolean
  img: (line: string) => boolean
  bold: (line: string) => boolean
  header: (line: string) => boolean
  video: (line: string) => boolean
}

export type ContentParserParseLineAs = {
  link: (line: string) => string
  img: (line: string) => string
  bold: (line: string) => string
  header: (ine: string) => string
  video: (line: string) => string
}

export enum ContentKind {
  LINK = 'LINK',
  IMG = 'IMG',
  HEADER = 'HEADER',
  BOLD = 'BOLD',
  VIDEO = 'VIDEO'
}

export type ContentTypesKeyValue = { [key in ContentKind]: string }