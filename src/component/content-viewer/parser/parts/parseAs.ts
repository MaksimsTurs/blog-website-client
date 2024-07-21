import type { ContentParserParseLineAs } from "../parseContent.type";

import is from "./is";
import regexp from "./regexp";

//Example for testing.
// [Link;https://link] and this is #other# lin #[Link 2;https://link]# (img;https://www.datocms-assets.com/48401/1628644950-javascript.png)

export default {
  bold: function(line: string) {
    return line.replace(regexp.BOLD_REGEXP, '<b>$1</b>')
  },
  header: function(line: string) {
    return line.replace(regexp.HEADER_REGEXP, '<h1 class="title">$1</h1>')
  },
  img: function(line: string) {
    const matchers = line.match(regexp.IMAGE_REGEXP)

    let index: number = 0
    let parsed: string = line

    while(matchers?.[index]) {
      const link = matchers[index].replace(regexp.PAIR_BRACKETS_REGEXP, '$1').split(/;/)
      
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

      parsed = parsed.replace(matchers[index], `<a class="link" href="` + link[1] + `">` + link[0] + `</a>`)
      index++
    }

    return parsed
  },
  video: function(line: string) {
    let videoURL: string | undefined = line.replace(/\[(.+)\]/g, '$1')  
    
    // if(!is.secureLink(videoURL)) videoURL = undefined

    return(
      `
        <div style="width: 100%" class="flex-row-center-center-none">
          <video controls src=${videoURL}></video>
        </div>
      `
    )
  }
} as ContentParserParseLineAs