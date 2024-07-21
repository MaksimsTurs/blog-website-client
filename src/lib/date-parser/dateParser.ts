const DateParser = {
  getDifference: function(date?: string) {
    if(!date) return ''

    const differences = getDifferences(Date.parse(date), Date.now())

    if(differences.year > 0) {
      return `${differences.year}:${differences.month}`
    } else if(differences.month > 0) {
      return `${differences.month} months ${differences.day} days ago!`
    } else if(differences.day > 0) {
      return `${differences.day} days ${differences.hour} hourse ago!`
    } else if(differences.hour > 0) {
      return `${differences.hour} hourse ago!`
    } else if(differences.minute > 0) {
      return `${differences.minute} minutes ${differences.second} seconds ago!`
    } else if(differences.second > 0) {
      return `${differences.second} seconds ago!`
    }
  }
}

function formatTimeNumber(time: number) {
  return parseInt(String(Math.abs(time)))
}

function getDifferences(firstTimeStamp: number, secondTimeStamp: number) {
  const difference = firstTimeStamp - secondTimeStamp

  return {
    second: formatTimeNumber((difference / 1000) % 60),
    minute: formatTimeNumber((difference / 1000 / 60) % 60),
    hour:   formatTimeNumber(difference  / (1000 * 60 * 60) % 24),
    day:    formatTimeNumber(difference  / (1000 * 60 * 60 * 24) % 9),
    month:  formatTimeNumber(difference  / (1000 * 60 * 60 * 24 * 7) % 12),
    year:   formatTimeNumber(difference  / (1000 * 60 * 60 * 24 * 7 * 12) % 365)
  }
}

export default DateParser