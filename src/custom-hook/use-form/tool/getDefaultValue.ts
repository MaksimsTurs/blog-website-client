export default function getDefaultValue(name: string) {
  const input = document.getElementsByName(name)?.[0] as HTMLInputElement
  
  if(input?.type === 'checkbox') return input.checked
}