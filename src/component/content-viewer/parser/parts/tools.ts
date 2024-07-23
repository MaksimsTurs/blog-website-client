import { ContentTools } from "../contentParser.type";

import regexp from "./regexp";

export default {
  splitLineOnTags: function(line: string) {    
    if(!regexp.TAG_BRACKET_REGEXP.test(line)) return [line]

    let splitArray: string[] = [], tempStirng: string = '', isTagStart: boolean = false, currTag: string = ''
  
    for(let index: number = 0; index < line.length; index++) {
      const letter: string = line[index]
  
      if(letter === '<' && !isTagStart) {
        isTagStart = true
        currTag = line[index + 1]
        splitArray.push(tempStirng)
        tempStirng = ''
      }
  
      if(letter === '/' && line[index - 1] === '<' && line[index + 2] === '>' && currTag === line[index + 1]) {
        splitArray.push(`${tempStirng}/${line[index + 1]}>`)
        isTagStart = false
        tempStirng = ''
        currTag = ''
        index += 2
        continue
      }
      
      tempStirng += letter

      if(tempStirng.length > 0 && index + 1 === line.length) splitArray.push(tempStirng)
    }
  
    return splitArray.filter(words => words)
  }
} as ContentTools