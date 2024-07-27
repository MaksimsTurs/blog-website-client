export type ContentParser = {
  regexp: ContentRegexp
  kind: ContentTypesKeyValue
  is: ContentIs
  have: LineHave
  parseAs: ContentParserParseLineAs
  tools: ContentTools
  error: ContentParserError
}

export type ContentParserError = {
  throw: (information: ContentParserErrorInformation) => void
}

export type ContentParserErrorInformation = {
  content: string
  function: string
  message: string
}

export type ContentRegexp = {
  BOLD_REGEXP: RegExp 
  HEADER_REGEXP_1: RegExp
  HEADER_REGEXP_2: RegExp 
  IMAGE_REGEXP: RegExp 
  LINK_REGEXP: RegExp
  VIDEO_REGEXP: RegExp
  DEFAULT_REGEXP: RegExp
  QUOTE_BRACKETS_REGEXP: RegExp
  HTTPS_PROTOCOL_REGEXP: RegExp
  HTML_TAG_WITH_HANDLERS_REGEXP: RegExp
  SCRIPT_TAG_REGEXP: RegExp
  SQUARE_BRACKETS_REGEXP: RegExp
  PAIR_BRACKETS_REGEXP: RegExp
  TAG_BRACKET_REGEXP: RegExp
}

export type LinkLikeDictionary = {
  [key: string]: { 
    text: string
    link?: string
    context?: string 
  }
}

export type ContentTools = {
  splitLineOnTags: (line: string) => string[]
}

export type ContentIs = {
  secureURL: (url: string) => boolean
  secureHTMLTag: (line: string) => boolean
}

export type LineHave = {
  link: (line: string) => boolean
  img: (line: string) => boolean
  bold: (line: string) => boolean
  header1: (line: string) => boolean
  header2: (line: string) => boolean
  video: (line: string) => boolean
  lineIntendention: (line: string) => boolean
  listItem: (line: string) => boolean
  quote: (line: string) => boolean
}

export type ContentParserParseLineAs = {
  link: (line: string) => string
  img: (obj: { index: number }, lines: string[]) => string
  listItem: (obj: { index: number }, lines: string[]) => string
  bold: (line: string) => string
  header1: (ine: string) => string
  header2: (line: string) => string
  video: (line: string) => string
  lineIntendention: () => string
  paragraph: (line: string) => string
  quote: (line: string) => string
}

export enum ContentKind {
  LIST =      'LIST',
  HEADER1 =   'HEADER1',
  HEADER2 =   'HEADER2',
  BOLD =      'BOLD',
  QUOTE =     'QUOTE',
  LINK =      'LINK',
  IMG =       'IMG',
  VIDEO =     'VIDEO',
  PARAGRAPH = 'PARAGRAPH'
}

export type ContentTypesKeyValue = { [key in ContentKind]: string }