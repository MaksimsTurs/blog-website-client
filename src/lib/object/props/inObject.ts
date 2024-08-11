export default function inObject<T>(object: any, keys: (keyof T)[]): boolean {
  if(typeof object !== 'object' || Array.isArray(object)) return false

  for(let index: number = 0; index < keys.length; index++) if(Object.hasOwn(object, keys[index])) return true

  return false
}