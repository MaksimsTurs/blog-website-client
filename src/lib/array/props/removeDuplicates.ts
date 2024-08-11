export default function removeDuplicates(array: any[], duplicates: any[]): any[] {
  let withoutDuplicate: any[] = []

  for(let index: number = 0; index < array.length; index++) {
    for(let jndex: number = 0; jndex < duplicates.length; jndex++) {
      if(array[index] === duplicates[jndex]) continue
      withoutDuplicate.push(array[index])
    }
  }

  return withoutDuplicate
}