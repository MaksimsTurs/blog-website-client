import type { DateParse, Difference, GetDifferenceStringParams, GetSortDateParams } from "./dateParser.type"

const DateParser: DateParse = {
  getDifference: function(date?: string) {
    if(!date) return this

    const difference = Date.parse(date) - Date.now()

    let differenceObject: Difference<number> = {
      second: formatTimeNumber((difference / 1000) % 60),
      minute: formatTimeNumber((difference / 1000 / 60) % 60),
      hour:   formatTimeNumber(difference  / (1000 * 60 * 60) % 24),
      day:    formatTimeNumber(difference  / (1000 * 60 * 60 * 24) % 9),
      month:  formatTimeNumber(difference  / (1000 * 60 * 60 * 24 * 7) % 12),
      year:   formatTimeNumber(difference  / (1000 * 60 * 60 * 24 * 7 * 12) % 365)
    }

    return {...this, differenceObject }
  },
  getDifferenceString: function(differenceTemplates: GetDifferenceStringParams) {
    const NUM_REGEXP: RegExp = /(\$)/
    
    let differenceObjectString: Difference<string> = {
      day: '',
      hour: '',
      minute: '',
      month: '',
      second: '',
      year: ''
    }

    if(!this.differenceObject) {
      console.error('You need call "getDifference first"')
      return {...this, differenceObjectString }
    }

    if(differenceTemplates.year) {
      differenceObjectString.year = differenceTemplates.year.replace(NUM_REGEXP, this.differenceObject.year.toString())
    } else if(differenceTemplates.month) {
      differenceObjectString.month = differenceTemplates.month.replace(NUM_REGEXP, this.differenceObject.month.toString())
    } else if(differenceTemplates.day) {
      differenceObjectString.day = differenceTemplates.day.replace(NUM_REGEXP, this.differenceObject.day.toString())
    } else if(differenceTemplates.hour) {
      differenceObjectString.hour = differenceTemplates.hour.replace(NUM_REGEXP, this.differenceObject.hour.toString())
    } else if(differenceTemplates.minute) {
      differenceObjectString.minute = differenceTemplates.minute.replace(NUM_REGEXP, this.differenceObject.minute.toString())
    } else if(differenceTemplates.second) {
      differenceObjectString.second = differenceTemplates.second.replace(NUM_REGEXP, this.differenceObject.second.toString())
    }

    return {...this, differenceObjectString }
  },
  getSortDate: function(template: GetSortDateParams) {
    const differenceObject: Difference<number> | undefined = this.differenceObject

    if(!differenceObject) {
      console.error('You need call "getDifference" first')
      return ''
    }

    if(differenceObject.year > 0 && template.year) return parseTemplate(template.year, differenceObject)
    if(differenceObject.month > 0 && template.month) return parseTemplate(template.month, differenceObject)
    if(differenceObject.day > 0 && template.day) return parseTemplate(template.day, differenceObject)
    if(differenceObject.hour > 0 && template.hour) return parseTemplate(template.hour, differenceObject)
    if(differenceObject.minute > 0 && template.minute) return parseTemplate(template.minute, differenceObject)
    if(differenceObject.second > 0 && template.second) return parseTemplate(template.second, differenceObject)

    return ''
  }
}

function parseTemplate(template: string, differenceObject: Difference<number>): string {
  const KEY_REGEXP: RegExp = /\[[a-z\s]+?\]/g
  const SQUARE_BRACKETS: RegExp = /\[([a-z\s]+?)\]/g

  const matchers = template.match(KEY_REGEXP)

  let parsed: string = template
  let index: number = 0

  while(matchers?.[index]) {
    const key: string = matchers[index].replace(SQUARE_BRACKETS, '$1')
    parsed = parsed.replace(`[${key}]`, differenceObject[key as keyof typeof differenceObject].toString())
    index++
  }

  return parsed
}

function formatTimeNumber(time: number) {
  return parseInt(String(Math.abs(time)))
}

export default DateParser