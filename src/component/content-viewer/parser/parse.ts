import ContentParser from "./contentParser"

export default function parse(content: string): string {
  if(!content) return ''

  let lines: string[] = content.split('\\n')
  let parsed: string = ''

  if(lines.length === 1) lines = content.split('\n')

  for(let obj = { index: 0 }; obj.index < lines.length; obj.index++) {
    if(ContentParser.have.lineIntendention(lines[obj.index])) {
      parsed += ContentParser.parseAs.lineIntendention()
      continue
    }

    if(ContentParser.have.quote(lines[obj.index])) {
      parsed += ContentParser.parseAs.quote(lines[obj.index])
      continue
    }

    if(ContentParser.have.header2(lines[obj.index])) {
      parsed += ContentParser.parseAs.header2(lines[obj.index])
      continue
    }

    if(ContentParser.have.header1(lines[obj.index])) {
      parsed += ContentParser.parseAs.header1(lines[obj.index])
      continue
    }

    if(ContentParser.have.img(lines[obj.index])) {
      parsed += ContentParser.parseAs.img(obj, lines)
      obj.index--
      continue
    }

    if(ContentParser.have.video(lines[obj.index])) {
      parsed += ContentParser.parseAs.video(lines[obj.index])
      continue
    }  
    
    if(ContentParser.have.listItem(lines[obj.index])) {
      parsed += ContentParser.parseAs.listItem(obj, lines)
      obj.index--
      continue
    }
    
    if(ContentParser.have.bold(lines[obj.index]))  lines[obj.index] = ContentParser.parseAs.bold(lines[obj.index])
    if(ContentParser.have.link(lines[obj.index]))  lines[obj.index] = ContentParser.parseAs.link(lines[obj.index])

    lines[obj.index] = ContentParser.parseAs.paragraph(lines[obj.index])
    lines[obj.index] = `<div class="line flex-row-normal-normal-medium">` + lines[obj.index] + `</div>`
    parsed += lines[obj.index]
  }

  parsed = `<div style="width: 100%;" class="flex-column-normal-normal-none">` + parsed + `</div>`

  if(!ContentParser.is.secureHTMLTag(parsed)) ContentParser.error.throw({ content: parsed, function: 'parse', message: 'HTML Contains handlers or script tag!' })

  return parsed
}