export default function include(what: any[], array: any[]): boolean {
  for(let index: number = 0; index < array.length; index++) {
    for(let jndex: number = 0; jndex < what.length; jndex++) {
      if(what[jndex] === array[index]) return true
    }
  }

  return false
}