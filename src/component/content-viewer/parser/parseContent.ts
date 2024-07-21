import ContentParser from "./contentParser"

export default function parseContent(content: string): string {
  if(!content) return ''

  let lines: string[] = content.split('\\n')
  let parsed: string = ''

  if(lines.length === 1) lines = content.split('\n')

  for(let index: number = 0; index < lines.length; index++) {
    if(ContentParser.have.header(lines[index])) lines[index] = ContentParser.parseAs.header(lines[index])    
    if(ContentParser.have.bold(lines[index]))   lines[index] = ContentParser.parseAs.bold(lines[index])
    if(ContentParser.have.link(lines[index]))   lines[index] = ContentParser.parseAs.link(lines[index])
    if(ContentParser.have.img(lines[index]))    lines[index] = ContentParser.parseAs.img(lines[index])
    if(ContentParser.have.video(lines[index]))  lines[index] = ContentParser.parseAs.video(lines[index])

    lines[index] = `<div class="container">` + lines[index] + `</div><br/>`
    parsed += lines[index]
  }

  return parsed
}