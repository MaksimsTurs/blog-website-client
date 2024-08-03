import ContentParser from "./contentParser"

export default function parse(content: string): string {
  if(!content) return ''

  let lines: string[] = content.split('\\n')
  let parsed: string = ''

  if(lines.length === 1) lines = content.split('\n')

  for(let obj = { index: 0 }; obj.index < lines.length; obj.index++) {
    if(ContentParser.have.intendention(lines[obj.index])) {
      parsed += ContentParser.parseAs.intendention()
      ContentParser.benchmark.countKind(ContentParser.kind.INTENDENTION)
      continue
    }
    
    if(ContentParser.have.quote(lines[obj.index])) {
      parsed += ContentParser.parseAs.quote(lines[obj.index])
      ContentParser.benchmark.countKind(ContentParser.kind.QUOTE)
      continue
    }
    
    if(ContentParser.have.header2(lines[obj.index])) {
      parsed += ContentParser.parseAs.header2(lines[obj.index])
      ContentParser.benchmark.countKind(ContentParser.kind.HEADER_2)
      continue
    }
    
    if(ContentParser.have.header1(lines[obj.index])) {
      parsed += ContentParser.parseAs.header1(lines[obj.index])
      ContentParser.benchmark.countKind(ContentParser.kind.HEADER_1)
      continue
    }
    
    if(ContentParser.have.img(lines[obj.index])) {
      parsed += ContentParser.parseAs.img(obj, lines)
      ContentParser.benchmark.countKind(ContentParser.kind.IMG)
      obj.index--
      continue
    }

    if(ContentParser.have.video(lines[obj.index])) {
      parsed += ContentParser.parseAs.video(lines[obj.index])
      ContentParser.benchmark.countKind(ContentParser.kind.VIDEO)
      continue
    }  
    
    if(ContentParser.have.list(lines[obj.index])) {
      parsed += ContentParser.parseAs.list(obj, lines)
      ContentParser.benchmark.countKind(ContentParser.kind.LIST)
      obj.index--
      continue
    }
    
    if(ContentParser.have.bold(lines[obj.index]))  {
      lines[obj.index] = ContentParser.parseAs.bold(lines[obj.index])
      ContentParser.benchmark.countKind(ContentParser.kind.BOLD)
    }

    if(ContentParser.have.link(lines[obj.index])) {
      lines[obj.index] = ContentParser.parseAs.link(lines[obj.index])
      ContentParser.benchmark.countKind(ContentParser.kind.LINK)
    }

    lines[obj.index] = `<div dir="auto" class="line flex-row-normal-normal-medium">` + lines[obj.index] + `</div>`
    parsed += lines[obj.index]

    ContentParser.benchmark.countKind(ContentParser.kind.LINE)
  }

  parsed = `<div style="width: 100%;" class="flex-column-normal-normal-none">` + parsed + `</div>`

  if(!ContentParser.secure.DOM(parsed)) ContentParser.error.throw({ content: parsed, function: 'parse', message: 'HTML Contains handlers or script tag!' })

  return parsed
}