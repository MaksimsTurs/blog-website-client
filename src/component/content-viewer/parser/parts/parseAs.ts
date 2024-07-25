import type { ContentParserParseLineAs, LinkLikeDictionary } from "../contentParser.type";

import have from "./have";
import regexp from "./regexp";
import tools from "./tools";

export default {
  header1: function(line) {
    return line.replace(regexp.HEADER_REGEXP_1, '<h1 class="header_1 content_flex">$1</h1>')
  },
  header2: function(line) {
    return line.replace(regexp.HEADER_REGEXP_2, '<h2 class="header_2 content_flex">$1</h2>')
  },
  bold: function(line: string) {
    return line.replace(regexp.BOLD_REGEXP, '<b class="content_flex">$1</b>')
  },
  lineIntendention: function() {
    return '<div class="intendention"></div>'
  },
  listItem: function(line: string) {
    return line.replace(/.*/, `<ul class="content_flex list"><li>${line.replace('+', '')}</li></ul>`)
  },
  img: function(obj, lines) {
    let parsed: string = '', imgDictionary: LinkLikeDictionary = {}

    for(; obj.index < lines.length;) {
      if(have.img(lines[obj.index])) {
        const [text, url] = lines[obj.index].replace(regexp.PAIR_BRACKETS_REGEXP, '$1').split(/;/)
        imgDictionary[obj.index] = { text, link: url }
        obj.index++
      } else break
    }
    
    const entries = Object.entries(imgDictionary)

    for(let [_, value] of entries) {
      parsed += `<img class="img" src="` + value.link + `"` + `alt="` + value.text + `">`
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
    let videoURL: string | undefined = line.replace(regexp.VIDEO_REGEXP, '$1')  
    
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