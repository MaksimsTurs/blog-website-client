export default function countDuplicates<T>(array: any[], find: (keyof T)[]): Record<keyof T, number> {
  let count: Record<keyof T, number> | undefined

  for(let index: number = 0; index < array.length; index++) {
    for(let jndex: number = 0; jndex < find.length; jndex++) {
      //@ts-ignore
      if(typeof count === 'undefined') count = {}
      else if(typeof count?.[find[jndex]] === 'undefined' && array[index] === find[jndex]) count![find[jndex]] = 1
      else if(count?.[find[jndex]] && array[index] === find[jndex]) count![find[jndex]]++
    }
  }

  console.log(count)

  return count!
}