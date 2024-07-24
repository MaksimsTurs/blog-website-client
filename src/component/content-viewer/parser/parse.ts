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

    if(ContentParser.have.img(lines[obj.index])) {
      parsed += `<div class="container_full_width container container_flex">` + ContentParser.parseAs.img(obj, lines) + `</div>`
      obj.index--
      continue
    }

    if(ContentParser.have.video(lines[obj.index])) {
      parsed += `<div class="container_full_width container">` + ContentParser.parseAs.video(lines[obj.index]) + `</div>`
      continue
    }
    
    if(ContentParser.have.header(lines[obj.index])) {
      parsed += ContentParser.parseAs.header(lines[obj.index])
      continue
    }    
    
    if(ContentParser.have.bold(lines[obj.index]))     lines[obj.index] = ContentParser.parseAs.bold(lines[obj.index])
    if(ContentParser.have.link(lines[obj.index]))     lines[obj.index] = ContentParser.parseAs.link(lines[obj.index])
    
    if(ContentParser.have.listItem(lines[obj.index])) {
      parsed += `<div class="container_full_width container list_container">` + ContentParser.parseAs.listItem(lines[obj.index]) + `</div>`
      continue
    }

    lines[obj.index] = ContentParser.parseAs.paragraph(lines[obj.index])
    lines[obj.index] = `<div class="container_flex container">` + lines[obj.index] + `</div><div style="width: 100%;"></div>`
    parsed += lines[obj.index]
  }

  return parsed
}