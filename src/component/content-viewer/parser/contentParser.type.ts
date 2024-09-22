import type { KeyValueObject } from "@/global.type"

export type ContentParser = {
  regexp: ContentRegexp
  secure: ContentSecure
  kind: ContentTypesDictionary<ContentKinds, ContentKinds>
  have: LineHave
  parseAs: ContentParserParseLineAs
  benchmark: ContentParserBenchmark
  error: ContentParserError
}

export type ContentRegexp = {
//---------HTML Elements-------------------//
  HEADER_REGEXP_1: RegExp
  HEADER_REGEXP_2: RegExp 
  BOLD_REGEXP: RegExp 
  IMAGE_REGEXP: RegExp 
  LINK_REGEXP: RegExp
  VIDEO_REGEXP: RegExp
//----------Other useful RegExp-----------//
  QUOTE_BRACKETS_REGEXP: RegExp
  DEFAULT_REGEXP: RegExp
  SQUARE_BRACKETS_REGEXP: RegExp
  PAIR_BRACKETS_REGEXP: RegExp
  TAG_BRACKET_REGEXP: RegExp
//-------------Secure RegExp---------------//
  PROTOCOL_REGEXP: RegExp
  UNSAFE_HTML_HANDLERS: RegExp
  HTML_TAG_REGEXP: RegExp
}

export type ContentSecure = {
  URL: (url: string, information: ContentParsingErrorInformation) => void
  containsHTMLTag: (content: string, information: ContentParsingErrorInformation) => void
}

export type ContentKinds =
  'HEADER_1'     |
  'HEADER_2'     |
  'LINE'         |
  'INTENDENTION' |
  'LIST'         |
  'BOLD'         |
  'QUOTE'        |
  'LINK'         |
  'IMG'          |
  'VIDEO'

export type ContentTypesDictionary<ContentKinds extends string, V> = { 
  [key in ContentKinds]: V 
}

export type LineHave = {
  link: (line: string) => boolean
  img: (line: string) => boolean
  bold: (line: string) => boolean
  header1: (line: string) => boolean
  header2: (line: string) => boolean
  video: (line: string) => boolean
  intendention: (line: string) => boolean
  list: (line: string) => boolean
  quote: (line: string) => boolean
}

export type ContentParserParseLineAs = {
  link: (line: string) => string
  img: (obj: { index: number }, lines: string[]) => string
  list: (obj: { index: number }, lines: string[]) => string
  bold: (line: string) => string
  header1: (ine: string) => string
  header2: (line: string) => string
  video: (line: string) => string
  intendention: () => string
  quote: (line: string) => string
}

export type ContentParsingErrorInformation = {
  content: string
  function: `${string}.${keyof ContentParserParseLineAs}` | 'parse'
  message: string
}

export type ContentParserError = {
  throw: (information: ContentParsingErrorInformation) => void
}

export type LinkLikeDictionary = {
  [key: string]: { 
    text: string
    link?: string
    context?: string 
  }
}

export type ContentParserBenchmark = {
  parsingTime: number
  kindCount: ContentTypesDictionary<ContentKinds, number> | KeyValueObject
  reset: () => void
  countKind: (kind: ContentKinds) => void
  getParsingBenchmarkResultAndParsedContent: (content: string) => string
}