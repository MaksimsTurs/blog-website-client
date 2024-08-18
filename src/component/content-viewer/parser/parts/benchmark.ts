import { ContentParserBenchmark } from "../contentParser.type";

import Integer from "@/lib/number/number";

import parse from "../parse";

export default {
  parsingTime: 0,
  kindCount: {},
  getParsingBenchmarkResultAndParsedContent: function(content) {
    const NUM_COLOR: string = 'color: #F48023'
    const KIND_COLOR: string = 'color: #49be49'
    const TEXT_COLOR: string = 'color: white'

    const parseStart: number = Date.now()
    const parsed = parse(content)
    const parseEnd: number = (Date.now() - parseStart) / 1000
    
    const kindCountEntries: [string, number][] = Object.entries(this.kindCount)

    console.info('-----------------------Parse start------------------------------')
    console.info('Content size (charachters): %c%s', NUM_COLOR, Integer.shortNum(parsed.length))
    console.info('Content parsing time: %c%fs', NUM_COLOR, parseEnd)
    for(let [kindName, count] of kindCountEntries) console.info('Count of %c%s%c: %c%d', KIND_COLOR, kindName, TEXT_COLOR, NUM_COLOR, count)
    console.info('-----------------------Parse end--------------------------------')

    return parsed
  },
  countKind: function(kind) {
    if(this.kindCount[kind]) this.kindCount[kind]++
    else this.kindCount[kind] = 1
  },
  reset: function() {
    this.parsingTime = 0
    this.kindCount = {}
  }
} as ContentParserBenchmark