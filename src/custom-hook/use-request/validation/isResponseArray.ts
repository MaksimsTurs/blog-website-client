export default function isResponseArry(response: any) {
  if(Array.isArray(response)) return true
  return false
}