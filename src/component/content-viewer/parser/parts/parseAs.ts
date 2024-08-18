import type { ContentParserParseLineAs, LinkLikeDictionary } from "../contentParser.type";

import have from "./have";
import secure from "./secure";
import regexp from "./regexp";
import error from "./error";
import benchmark from "./benchmark";
import kind from "./kind";

export default {
  intendention: function() {
    benchmark.countKind(kind.INTENDENTION)
    return '<div class="intendention"></div>'
  },
  header2: function(line) {
    benchmark.countKind(kind.HEADER_2)
    return line.replace(regexp.HEADER_REGEXP_2, '<h2 class="header header_2">$1</h2>')
  },
  header1: function(line) {
    benchmark.countKind(kind.HEADER_1)
    return line.replace(regexp.HEADER_REGEXP_1, '<h1 class="header header_1">$1</h1>')
  },
  bold: function(line) {
    benchmark.countKind(kind.BOLD)
    return line.replace(regexp.BOLD_REGEXP, '<b class="bold container_flex">$1</b>')
  },
  list: function(obj, lines) {
    benchmark.countKind(kind.LIST)
    let parsed: string = '', listDictionary: LinkLikeDictionary = {}, entries = []

    //Collect all list items
    for(; obj.index < lines.length;) {
      if(have.list(lines[obj.index])) {
        let text = lines[obj.index].replace('+', '')

        if(have.link(text)) text = this.link(text)
        if(have.bold(text)) text = this.bold(text)

        listDictionary[obj.index] = { text }
        obj.index++
      } else break
    }
    
    entries = Object.entries(listDictionary)

    for(let [_, value] of entries) {
      parsed += `<li>` + value.text + `</li>`
    }

    return `<ul class="list flex-column-normal-normal-small">` + parsed + `</ul>`
  },
  img: function(obj, lines) {
    benchmark.countKind(kind.IMG)
    let parsed: string = '', imgDictionary: LinkLikeDictionary = {}, entries = []

    //Collect all images
    for(; obj.index < lines.length;) {
      if(have.img(lines[obj.index])) {
        const [text, context, src] = lines[obj.index].replace(/\<(.*)\>/g, '$1').trim().split(/;/)
        
        if(!src && secure.URL(context)) {
          imgDictionary[obj.index] = { text, link: context }
        } else if(src && secure.URL(src)) {
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
          <div class="img_with_context flex-column-center-center-big">
            <a target="_blank" href="` + value.link + `"><img src="` + value.link + `"` + `alt="` + value.text + `"></a>
            <p>` + value.context + `</p>
          </div>
        `
        continue
      }

      parsed += `<a target="_blank" href="` + value.link + `"><img class="img" src="` + value.link + `"` + `alt="` + value.text + `"></a>`
    }

    return `<div style="flex-wrap: wrap; margin: 1rem 0rem;" class="flex-row-center-center-none">` + parsed + `</div>`
  },
  link: function(line) {
    benchmark.countKind(kind.LINK)
    const matchers = line.match(regexp.LINK_REGEXP)

    let index: number = 0
    let parsed: string = line

    while(matchers?.[index]) {
      const link: string[] = matchers[index].replace(regexp.SQUARE_BRACKETS_REGEXP, '$1').split(/;/)

      if(!secure.URL(link[1])) {
         error.throw({ content: line, function: 'parseAs.link', message: `Type of URL "${link[1]}" is "${typeof link[1]}", URL is not string or URL is not secure!` })
      }
      
      parsed = parsed.replace(matchers[index], `<a target="_blank" class="link content_flex" href="` + link[1] + `">` + link[0] + `</a>`)
      index++
    }

    return parsed
  },
  video: function(line) {
    benchmark.countKind(kind.VIDEO)
    let videoURL: string | undefined = line.replace(regexp.VIDEO_REGEXP, '$1')  

    if(!secure.URL(videoURL)) {
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
  quote: function(line) {
    benchmark.countKind(kind.QUOTE)
    const name: string = line.replace(regexp.QUOTE_BRACKETS_REGEXP, '$1')

    let text: string = line.replace(regexp.QUOTE_BRACKETS_REGEXP, '$2')

    if(have.bold(text)) text = this.bold(text)

    return (
      `
        <div class="quote_container flex-row-center-center-none">
          <div class="quote_body">
            <div class="quote_svg_body">
              <svg class="quote_svg quote_start" width="20" height="20" viewBox="0 0 25 25" fill="none" stroke="currentColor" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-quote"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/></svg>
            </div>
            ` + (name ? `<p class="quote_name">` + name + `:</p>` : '') + `
            <p>` + text + `</p>
            <div class="quote_svg_body">
              <svg class="quote_svg" width="20" height="20" viewBox="0 0 25 25" fill="none" stroke="currentColor" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-quote"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/></svg>
            </div>
          </div>
        </div>
      `
    )
  }
} as ContentParserParseLineAs