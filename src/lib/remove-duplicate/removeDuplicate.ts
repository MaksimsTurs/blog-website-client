export default function removeDuplicate(array: any[], duplicate: any) {
  let withoutDuplicate: any[] = []

  for(let index: number = 0; index < array.length; index++) {
    if(array[index] === duplicate) continue
    withoutDuplicate.push(array[index])
  }

  return withoutDuplicate
}