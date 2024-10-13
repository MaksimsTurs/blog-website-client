export default function formatNum(num: number): string | number {
  if(num < 9) return `00${num}`
  if(num > 9 && num < 1E3) return `0${num}`
  
  return num
}