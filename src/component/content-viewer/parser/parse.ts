import ContentParser from "./contentParser"

export default function parse(content: string): string {
  if(!content) return ''

  let lines: string[] = content.split('\\n')
  let parsed: string = ''

  if(lines.length === 1) lines = content.split('\n')

  for(let obj = { index: 0 }; obj.index < lines.length; obj.index++) {
    if(ContentParser.have.lineIntendention(lines[obj.index])) {
      parsed += ContentParser.parseAs.lineIntendention()
      // ContentParser.benchmark.benchCount(ContentParser.kind.LINE_END)
      continue
    }
    
    if(ContentParser.have.quote(lines[obj.index])) {
      parsed += ContentParser.parseAs.quote(lines[obj.index])
      // ContentParser.benchmark.benchCount(ContentParser.kind.QUOTE)
      continue
    }
    
    if(ContentParser.have.header2(lines[obj.index])) {
      parsed += ContentParser.parseAs.header2(lines[obj.index])
      // ContentParser.benchmark.benchCount(ContentParser.kind.HEADER_2)
      continue
    }
    
    if(ContentParser.have.header1(lines[obj.index])) {
      parsed += ContentParser.parseAs.header1(lines[obj.index])
      // ContentParser.benchmark.benchCount(ContentParser.kind.HEADER_1)
      continue
    }
    
    if(ContentParser.have.img(lines[obj.index])) {
      // ContentParser.benchmark.benchStart(ContentParser.kind.IMG)
      parsed += ContentParser.parseAs.img(obj, lines)
      // ContentParser.benchmark.benchEnd(ContentParser.kind.IMG)
      // ContentParser.benchmark.benchCount(ContentParser.kind.IMG)
      obj.index--
      continue
    }

    if(ContentParser.have.video(lines[obj.index])) {
      parsed += ContentParser.parseAs.video(lines[obj.index])
      // ContentParser.benchmark.benchCount(ContentParser.kind.VIDEO)
      continue
    }  
    
    if(ContentParser.have.listItem(lines[obj.index])) {
      parsed += ContentParser.parseAs.listItem(obj, lines)
      // ContentParser.benchmark.benchCount(ContentParser.kind.LIST)
      obj.index--
      continue
    }
    
    if(ContentParser.have.bold(lines[obj.index]))  {
      lines[obj.index] = ContentParser.parseAs.bold(lines[obj.index])
      // ContentParser.benchmark.benchCount(ContentParser.kind.BOLD)
    }

    if(ContentParser.have.link(lines[obj.index])) {
      lines[obj.index] = ContentParser.parseAs.link(lines[obj.index])
      // ContentParser.benchmark.benchCount(ContentParser.kind.LINK)
    }

    lines[obj.index] = `<div dir="auto" class="line flex-row-normal-normal-medium">` + lines[obj.index] + `</div>`
    parsed += lines[obj.index]
    // ContentParser.benchmark.benchCount(ContentParser.kind.LINE)
  }

  parsed = `<div style="width: 100%;" class="flex-column-normal-normal-none">` + parsed + `</div>`

  if(!ContentParser.is.secureDOM(parsed)) ContentParser.error.throw({ content: parsed, function: 'parse', message: 'HTML Contains handlers or script tag!' })

  return parsed
}