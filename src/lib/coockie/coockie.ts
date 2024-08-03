  import type { KeyValueObject } from "@/global.type"

function parse(): KeyValueObject {
  let coockies = {}
  
  document.cookie.split(/\;/).forEach(coockie => {
    const [key, value] = coockie.split(/\=/)
    coockies = {...coockies, [key.trim()]: value }
  })

  return coockies
}

const coockie = {
  getOne: function(key: string) {
    return parse()[key]
  },
  set: function(key: string, value: any) {
    document.cookie = `${key}=${value};Path=/;Max-Age=${60 * 60 * 24 * 7};`
  }
}

export default coockie