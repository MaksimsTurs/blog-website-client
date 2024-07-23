export type ContentParser = {
  regexp: ContentRegexp
  kind: ContentTypesKeyValue
  is: ContentIs
  have: LineHave
  parseAs: ContentParserParseLineAs
  tools: ContentTools
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
  TAG_BRACKET_REGEXP: RegExp
}

export type ContentTools = {
  splitLineOnTags: (line: string) => string[]
}

export type ContentIs = {
  secureLink: (url: string) => boolean
  imageTag: (line: string) => boolean
}

export type LineHave = {
  link: (line: string) => boolean
  img: (line: string) => boolean
  bold: (line: string) => boolean
  header: (line: string) => boolean
  video: (line: string) => boolean
  lineBreak: (line: string) => boolean
  listItem: (line: string) => boolean
}

export type ContentParserParseLineAs = {
  link: (line: string) => string
  img: (line: string) => string
  bold: (line: string) => string
  header: (ine: string) => string
  video: (line: string) => string
  lineBreak: () => string
  listItem: (line: string) => string
  paragraph: (line: string) => string
}

export enum ContentKind {
  LIST =      'LIST',
  HEADER =    'HEADER',
  BOLD =      'BOLD',
  LINK =      'LINK',
  IMG =       'IMG',
  VIDEO =     'VIDEO',
  PARAGRAPH = 'PARAGRAPH'
}

export type ContentTypesKeyValue = { [key in ContentKind]: string }