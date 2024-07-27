import type { ContentParserParseLineAs, LinkLikeDictionary } from "../contentParser.type";

import have from "./have";
import is from "./is";
import regexp from "./regexp";
import tools from "./tools";
import error from "./error";

export default {
  lineIntendention: function() {
    return '<div class="intendention"></div>'
  },
  header2: function(line) {
    return line.replace(regexp.HEADER_REGEXP_2, '<h2 class="header header_2">$1</h2>')
  },
  header1: function(line) {
    return line.replace(regexp.HEADER_REGEXP_1, '<h1 class="header header_1">$1</h1>')
  },
  bold: function(line) {
    return line.replace(regexp.BOLD_REGEXP, '<b class="container_flex">$1</b>')
  },
  listItem: function(obj, lines) {
    let parsed: string = '', listDictionary: LinkLikeDictionary = {}, entries = []

    //Collect all list items
    for(; obj.index < lines.length;) {
      if(have.listItem(lines[obj.index])) {
        let text = lines[obj.index].replace('+', '')

        if(have.link(text)) text = this.link(text)

        listDictionary[obj.index] = { text }
        obj.index++
      } else break
    }
    
    entries = Object.entries(listDictionary)

    for(let [_, value] of entries) {
      parsed += `<li>` + value.text + `</li>`
    }

    return `<ul class="list">` + parsed + `</ul>`
  },
  img: function(obj, lines) {
    let parsed: string = '', imgDictionary: LinkLikeDictionary = {}, entries = []

    //Collect all images
    for(; obj.index < lines.length;) {
      if(have.img(lines[obj.index])) {
        const [text, context, src] = lines[obj.index].replace(regexp.PAIR_BRACKETS_REGEXP, '$1').split(/;/)

        if(!src && is.secureURL(context)) {
          imgDictionary[obj.index] = { text, link: context }
        } else if(src && is.secureURL(src)) {
          imgDictionary[obj.index] = { text, link: src, context }
        } else {
          error.throw({ content: lines[obj.index], function: 'parseAs.img', message: `"context": ${context} or "src": ${src} is not defined or not secure!` })
        }
        
        obj.index++
      } else break
    }
    
    entries = Object.entries(imgDictionary)

    for(let [_, value] of entries) {
      if(value.context) {
        parsed += 
        `
          <div class="img_with_context flex-column-center-center-medium">
            <img src="` + value.link + `"` + `alt="` + value.text + `">
            <p>` + value.context + `</p>
          </div>
        `
        continue
      }

      parsed += `<img class="img" src="` + value.link + `"` + `alt="` + value.text + `">`
    }

    return `<div style="flex-wrap: wrap;" class="flex-row-center-center-none">` + parsed + `</div>`
  },
  link: function(line) {
    const matchers = line.match(regexp.LINK_REGEXP)

    let index: number = 0
    let parsed: string = line

    while(matchers?.[index]) {
      const link: string[] = matchers[index].replace(regexp.SQUARE_BRACKETS_REGEXP, '$1').split(/;/)

      if(!is.secureURL(link[1])) {
         error.throw({ content: line, function: 'parseAs.link', message: `Type of URL "${link[1]}" is "${typeof link[1]}", URL is not string or URL is not secure!` })
      }
      
      parsed = parsed.replace(matchers[index], `<a class="link content_flex" href="` + link[1] + `">` + link[0] + `</a>`)
      index++
    }

    return parsed
  },
  video: function(line) {
    let videoURL: string | undefined = line.replace(regexp.VIDEO_REGEXP, '$1')  

    if(!is.secureURL(videoURL)) {
      error.throw({ content: line, function: 'parseAs.video', message: `Type of video URL "${videoURL}" is "${typeof videoURL}", video URL is not string or URL is not secure!` })
    }
    
    return(
      `
        <div class="video_container flex-row-center-center-none">
          <video controls src="` + videoURL + `"></video>
        </div>
      `
    )
  },
  paragraph: function(line) {
    const lineParts: string[] = tools.splitLineOnTags(line)
  
    let part: string, partWords: string[], wrappedLine: string = ''
  
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
  },
  quote: function(line) {
    const name: string = line.replace(regexp.QUOTE_BRACKETS_REGEXP, '$1')

    let text: string = line.replace(regexp.QUOTE_BRACKETS_REGEXP, '$2')

    if(have.bold(text)) text = this.bold(text)

    return (
      `
        <div class="quote_container flex-row-center-center-none">
          <div class="quote_body">
            ` + (name ? `<p class="quote_name">` + name + `:</p>` : '') + `
            <svg class="quote_svg quote_start" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="none" stroke="currentColor" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-quote"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/></svg>
            <p>` + text + `</p>
            <svg class="quote_svg quote_end" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="none" stroke="currentColor" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-quote"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/></svg>
          </div>
        </div>
      `
    )
  }
} as ContentParserParseLineAs