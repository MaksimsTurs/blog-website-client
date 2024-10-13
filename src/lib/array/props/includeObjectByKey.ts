export default function includeObjectByKey<T>(array: any[], byKey: keyof T, value: any): boolean {
  for(let index: number = 0; index < array.length; index++) {
    if(array[index][byKey] === value) return true
  }

  return false
}