import type { ContentParserParseLineAs } from "../contentParser.type";

import regexp from "./regexp";
import tools from "./tools";

export default {
  header: function(line) {
    return line.replace(regexp.HEADER_REGEXP, '<h1 class="content_flex">$1</h1>')
  },
  bold: function(line: string) {
    return line.replace(regexp.BOLD_REGEXP, '<b class="content_flex">$1</b>')
  },
  lineBreak: function() {
    return '<p class="break"></p>'
  },
  listItem: function(line: string) {
    return line.replace(/.*/, `<ul class="content_flex list"><li>${line.replace('+', '')}</li></ul>`)
  },
  img: function(line: string) {
    const matchers = line.match(regexp.IMAGE_REGEXP)

    let index: number = 0
    let parsed: string = line

    while(matchers?.[index]) {
      const link: string[] = matchers[index].replace(regexp.PAIR_BRACKETS_REGEXP, '$1').split(/;/)
      
      //link[1] is img src URL, link[0] is img alt text.

      parsed = parsed.replace(matchers[index], `<img class="img" src="` + link[1] + `"` + `alt="` + link[0] + `">`)
      index++
    }

    return parsed
  },
  link: function(line: string) {
    const matchers = line.match(regexp.LINK_REGEXP)

    let index: number = 0
    let parsed: string = line

    while(matchers?.[index]) {
      const link = matchers[index].replace(regexp.SQUARE_BRACKETS_REGEXP, '$1').split(/;/)
      
      //link[1] is link URL, link[0] is link text.

      parsed = parsed.replace(matchers[index], `<a class="link content_flex" href="` + link[1] + `">` + link[0] + `</a>`)
      index++
    }

    return parsed
  },
  video: function(line: string) {
    let videoURL: string | undefined = line.replace(/\[(.+)\]/g, '$1')  
    
    return(
      `
        <div style="width: 100%" class="video">
          <video controls src=${videoURL}></video>
        </div>
      `
    )
  },
  paragraph: function(line: string) {
    let wrappedLine: string = ''

    const lineParts: string[] = tools.splitLineOnTags(line)
  
    let part: string, partWords: string[]
  
    for(let index: number = 0; index <  lineParts.length; index++) {
      part = lineParts[index]
  
      if(!regexp.TAG_BRACKET_REGEXP.test(part)) {
        partWords = part.split(' ')
  
        for(let windex: number = 0; windex < partWords.length; windex++) {
          if(partWords[windex].length === 0) continue
          wrappedLine += `<p>${partWords[windex]}</p>`
        }
  
        continue
      }
  
      wrappedLine += part
    }
  
    return wrappedLine
  }
} as ContentParserParseLineAs