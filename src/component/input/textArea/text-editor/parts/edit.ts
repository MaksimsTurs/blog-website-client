import type { TextEditorEdit } from "../textEditor.type";

export default {
  wrappKeys: {
    BOLD: '#',
    HEADER_1: '##',
    HEADER_2: '###',
    LINK: '[Text;Url]',
  },
  wrapp: function(content, textArea, to) {
    const start: number = textArea.selectionStart
    const end: number = textArea.selectionEnd

    const toWrapp: string = content.substring(start, end)
  
    if(start === 0) {
      if(to === 'LINK') return this.wrappKeys[to] + content.substring(end, content.length)
      return `${this.wrappKeys[to]}${toWrapp}${this.wrappKeys[to]}` + content.substring(end, content.length)
    } else if(end === content.length) {
      if(to === 'LINK') return content.substring(end, content.length) + this.wrappKeys[to]
      return content.substring(0, start) + `${this.wrappKeys[to]}${toWrapp}${this.wrappKeys[to]}`
    }

    if(to === 'LINK') return content.substring(0, start) + this.wrappKeys[to] + content.substring(end, content.length)

    return content.substring(0, start) + `${this.wrappKeys[to]}${toWrapp}${this.wrappKeys[to]}` + content.substring(end, content.length)
  },
  resource: function(url, content, textArea, to, alt, context) {
    const start: number = textArea.selectionStart
    const end: number = textArea.selectionEnd

    if(to === 'IMAGE') {
      if(context) return `${content.substring(0, end)}<${alt};${context};${url}>${content.substring(start, content.length)}`
      return `${content.substring(0, end)}<${alt};${url}>${content.substring(start, content.length)}`
    }

    return `${content.substring(0, end)}([${url}])${content.substring(start, content.length)}`
  }
} as TextEditorEdit