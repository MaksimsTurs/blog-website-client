import { ContentParserBenchmark } from "../contentParser.type";

import parse from "../parse";

export default {
  times: {},
  parsingTime: 0,
  parsingCounts: {},
  benchParsing: function(content) {
    this.benchStart('PARSING')
    const parsed = parse(content)
    this.benchEnd('PARSING')

    const countValues: [string, number][] = Object.entries(this.parsingCounts)

    const NUM_COLOR: string = 'color: yellow'

    console.info('Content size (letters): %c%d', NUM_COLOR, content.length)
    console.info('Content parsing time: %c%d', NUM_COLOR, this.times.PARSING[0])
    for(let [key, value] of countValues) console.info('Count of %s: %c%d', key, NUM_COLOR, value)

    return parsed
  },
  benchCount: function(key) {
    if(this.parsingCounts[key]) this.parsingCounts[key]++
    else this.parsingCounts[key] = 1
  },
  benchStart: function(key) {
    if(this.times[key]) this.times[key].push(new Date().getTime())
    else this.times[key] = [new Date().getTime()]
  },
  benchEnd: function(key) {
    const currIndex: number = this.times[key].length - 1
    const currentTime: number = new Date().getTime() - this.times[key][currIndex]

    this.times[key][currIndex] = currentTime
  }
} as ContentParserBenchmark