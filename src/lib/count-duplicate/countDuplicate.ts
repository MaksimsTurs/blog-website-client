export default function countDuplicate(array: any[], find: any): number {
  let count: number = 0

  for(let index: number = 0; index < array.length; index++) {
    if(array[index] === find) count++
  }

  return count
}